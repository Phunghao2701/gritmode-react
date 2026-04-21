// File: src/admin/components/ProductTable.jsx

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Kho Hàng Hiện Tại</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b">Ảnh</th>
            <th className="p-3 border-b">Tên Sản Phẩm</th>
            <th className="p-3 border-b">Giá</th>
            <th className="p-3 border-b text-center">Tồn Kho</th>
            <th className="p-3 border-b text-center">Trạng Thái</th>
            <th className="p-3 border-b text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="p-3 border-b font-medium">
                {p.name}
                <div className="text-xs text-gray-500 font-normal">
                  {p.category}
                </div>
              </td>
              <td className="p-3 border-b">
                {p.isSale ? (
                  <div>
                    <span className="line-through text-gray-400 text-sm">
                      {(p.oldPrice || p.price)?.toLocaleString()}đ
                    </span>
                    <br />
                    <span className="text-red-600 font-bold">
                      {(p.oldPrice ? p.price : p.salePrice)?.toLocaleString()}đ
                    </span>
                  </div>
                ) : (
                  <span className="font-medium">
                    {p.price?.toLocaleString()}đ
                  </span>
                )}
              </td>
              <td className="p-3 border-b text-center font-bold text-blue-600">
                {p.stock || 0}
              </td>
              <td className="p-3 border-b text-center">
                {p.isSale ? (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">
                    SALE
                  </span>
                ) : null}
              </td>
              <td className="p-3 border-b text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                Chưa có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
