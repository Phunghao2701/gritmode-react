import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
// Đảm bảo đường dẫn import db này đúng với cấu trúc thư mục của bạn
import { db } from "../../firebase/firebase";

export default function FilterSidebar({ filters, onFilterChange }) {
  // Thay vì fix cứng mảng, chúng ta dùng state để lưu danh mục lấy từ Firebase
  const [categories, setCategories] = useState([]);

  // Hàm gọi danh mục từ Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        // Lấy ra mảng các tên danh mục
        const fetchedCategories = querySnapshot.docs.map(
          (doc) => doc.data().name,
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  // Xử lý khi check/uncheck Category
  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category) // Bỏ check
      : [...filters.categories, category]; // Thêm check

    // Gửi state mới lên component cha
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  // Xử lý khi kéo thanh trượt Giá
  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) });
  };

  return (
    <aside className="w-full">
      {/* --- CATEGORY FILTER --- */}
      <div className="mb-10">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">
          Category
        </h3>
        <div className="space-y-3">
          {categories.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Đang tải danh mục...</p>
          ) : (
            categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  {/* Ẩn checkbox mặc định, dùng peer của Tailwind để style */}
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {/* Ô vuông custom */}
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-sm peer-checked:bg-orange-600 peer-checked:border-orange-600 transition-colors"></div>
                  {/* Icon dấu tick (chỉ hiện khi checked) */}
                  <svg
                    className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-500 font-medium group-hover:text-gray-900 transition-colors">
                  {category}
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* --- PRICE RANGE FILTER --- */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">
          Price Range
        </h3>
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="2000000" // Giả sử giá max là 2 triệu VNĐ
            step="50000" // Mỗi lần kéo nhích 50.000đ (Phù hợp VNĐ hơn)
            value={filters.maxPrice}
            onChange={handlePriceChange}
            // Tailwind accent color cho thanh trượt
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs font-medium text-gray-400">0đ</span>
            <span className="text-xs font-bold text-gray-900">
              {filters.maxPrice.toLocaleString()} VND
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
