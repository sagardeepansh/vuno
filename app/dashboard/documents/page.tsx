import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
// import UserTable from "@/components/UserTable";
import DocumentTable from "@/components/DocumentTable";
// import UserTable from "@/components/UserTable";

export default function Documents() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          <h2 className="text-lg text-black font-semibold mb-4">Documents</h2>
          <DocumentTable />
        </div>
      </div>
    </div>
  );
}