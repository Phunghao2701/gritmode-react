import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* Khung chứa ảnh */}
      <div className="relative bg-gray-100 mb-4 aspect-[4/5] overflow-hidden">
        {/* Badge SALE */}
        {product.isSale && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 z-10">
            SALE
          </span>
        )}

        {/* Ảnh sản phẩm */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Nút Add to Cart (Hiệu ứng trượt lên khi hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
          <span
            className="w-full bg-white text-gray-900 font-bold py-3 text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Eye className="w-4 h-4" /> XEM CHI TIẾT
          </span>
        </div>
      </div>

      {/* Thông tin sản phẩm (Giữ nguyên) */}
      <div className="flex justify-between items-start flex-grow">
        <div className="pr-4">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-1 uppercase">
            {product.category}
          </p>
        </div>
        <div className="text-right flex flex-col items-end flex-shrink-0">
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">
              {product.oldPrice.toLocaleString()} VND
            </span>
          )}
          <span
            className={`text-sm font-black ${product.isSale ? "text-red-600" : "text-gray-900"}`}
          >
            {product.price.toLocaleString()} VND
          </span>
        </div>
      </div>
    </Link>
  );
}
