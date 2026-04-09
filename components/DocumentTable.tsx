"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
    PlusIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    DocumentIcon,
} from "@heroicons/react/24/outline";

import Pagination from "./Pagination";

type Status = "processing" | "completed" | "failed";

type DocumentItem = {
    id: string;
    _id: string;
    fileName: string;
    fileType: string;
    docId: string;
    text: string;
    status: Status;
    createdAt: string;
};



export default function DocumentTable() {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    // console.log('documents', documents)
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [docData, setDocData] = useState<DocumentItem | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleView = async (id: string) => {
        setSelectedDocId(id);
        setLoading(true);
        setError("");
        setDocData(null);
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${apiUrl}/doc/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch document");

            const data = await res.json();
            setDocData(data?.data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedDocId(null);
        setDocData(null);
    };

    // ✅ Upload handler
    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        // Create temp docs
        const tempDocs: DocumentItem[] = files.map((file) => ({
            id: crypto.randomUUID(),
            fileName: file.name,
            _id: crypto.randomUUID(),
            fileType: file.type,
            docId: crypto.randomUUID(),
            status: "processing",
            text: "",
            createdAt: new Date().toLocaleDateString(),
        }));

        // Add to UI immediately
        setDocuments((prev) => [...tempDocs, ...prev]);

        // Upload each file separately (better control)
        for (let i = 0; i < files.length; i++) {
            uploadSingleFile(files[i], tempDocs[i].id);
        }
    };

    // ✅ Upload single file API
    const uploadSingleFile = async (file: File, docId: string) => {
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${apiUrl}/upload`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            console.log("Uploaded:", data);

            // ✅ Update only this file
            updateStatus(docId, "completed");
        } catch (err) {
            console.error(err);
            updateStatus(docId, "failed");
        }
    };


    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${apiUrl}/doc/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Delete failed");
            }
            fetchDocuments();

            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Delete error:", error.message);
                throw error;
            }

            throw new Error("Something went wrong");
        }
    };


    const fetchDocuments = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${apiUrl}/doc/list`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Fetched failed");

            const data = await res.json();
            setDocuments(data?.data);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    // ✅ Update status helper
    const updateStatus = (id: string, status: Status) => {
        setDocuments((prev) =>
            prev.map((doc) =>
                doc.id === id ? { ...doc, status } : doc
            )
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-6 py-4 border-b bg-white">

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 px-3 md:px-4 py-2 bg-black text-white rounded-lg text-sm cursor-pointer hover:bg-black/90 transition">
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
            <input
              type="file"
              multiple
              hidden
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleUpload}
            />
          </label>

          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
            <FunnelIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b">
              <th className="px-6 py-3">Name</th>
              <th>Type</th>
              <th>Doc ID</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>

          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <DocumentIcon className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm font-medium text-gray-600">
                      No documents uploaded
                    </p>
                    <p className="text-xs text-gray-400">
                      Upload files to start analyzing
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              documents.map((doc: any, index: number) => (
                <tr key={index} className="group border-b hover:bg-gray-50 transition">

                  {/* Name */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                      <DocumentIcon className="w-5 h-5 text-gray-500" />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {doc.fileName}
                      </p>
                    </div>
                  </td>

                  {/* Type */}
                  <td>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                      {doc?.fileType?.split("/")[1] || "unknown"}
                    </span>
                  </td>

                  {/* Doc ID */}
                  <td className="text-gray-400 text-xs font-mono">
                    {doc.docId}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium
                      ${doc.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {doc.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="text-gray-500 text-sm">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="text-right pr-6">
                    <div className="opacity-0 group-hover:opacity-100 transition flex justify-end gap-4">
                      <button
                        onClick={() => handleView(doc._id)}
                        className="text-blue-600 text-xs font-medium hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-500 text-xs font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden divide-y">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <DocumentIcon className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600">
              No documents uploaded
            </p>
          </div>
        ) : (
          documents.map((doc: any, index: number) => (
            <div key={index} className="p-4 space-y-3">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  <DocumentIcon className="w-5 h-5 text-gray-500" />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-gray-800 truncate">
                    {doc.fileName}
                  </p>
                  <p className="text-xs text-gray-400">{doc.docId}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded-md">
                  {doc?.fileType?.split("/")[1] || "unknown"}
                </span>

                <span
                  className={`px-2 py-1 rounded-full
                    ${doc.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : doc.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {doc.status}
                </span>

                <span className="text-gray-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-4 text-xs">
                <button
                  onClick={() => handleView(doc._id)}
                  className="text-blue-600 font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-red-500 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedDocId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-4 md:p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {docData && (
              <div>
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  {docData.fileName}
                </h2>
                <p className="text-sm text-gray-500 whitespace-pre-line">
                  {docData.text || "No content extracted"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="px-4 md:px-6 py-4 bg-gray-50 border-t">
        <Pagination />
      </div>
    </div>
    );
}