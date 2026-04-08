// import Avatar from "./Avatar";
// import { users } from "@/lib/data";
import Pagination from "./Pagination";

export default function UserTable() {
  return (
    <div className="bg-white border rounded-lg">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">+</button>
          <button className="px-3 py-1 border rounded">Filter</button>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded text-sm"
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr className="text-left border-b">
            <th className="p-3">Serial</th>
            <th>User</th>
            <th>Email</th>
            <th>Address</th>
            <th>Registration date</th>
          </tr>
        </thead>

        <tbody>
          {/* {users.map((user, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.id}</td>

              <td className="flex items-center gap-2 py-2">
                <Avatar name={user.name} />
                {user.name}
              </td>

              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.date}</td>
            </tr>
          ))} */}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
}