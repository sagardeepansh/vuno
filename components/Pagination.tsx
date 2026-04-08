export default function Pagination() {
  return (
    <div className="flex justify-center gap-2 p-4">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {num}
        </button>
      ))}
    </div>
  );
}