import { useState, useMemo, useEffect } from "react";
import Header from "../components/layout/Header";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductCard from "../components/shop/ProductCard";
import Pagination from "../components/shop/Pagination";
import CartDrawer from "../components/shop/CartDrawer";
import Footer from "../components/layout/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ITEMS_PER_PAGE = 6;

export default function Shop() {
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    maxPrice: 1000000,
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProductsFromFirebase = async () => {
      try {
        setIsLoading(true);
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);

        const productList = productSnapshot.docs.map((doc) => {
          const data = doc.data();
          const isProductOnSale = data.isSale === true;

          // Đọc dữ liệu từ Database theo logic của bạn:
          const giaSaleTrenDB = data.price || 0;
          // Nếu bạn lỡ quên chưa nhập oldPrice trên Firebase, mình lấy tạm giá Sale làm giá gốc để web ko bị lỗi hiện 0đ
          const giaGocTrenDB = data.oldPrice || giaSaleTrenDB;

          return {
            id: doc.id,
            name: data.name || "Sản phẩm lỗi tên",

            // 1. GIÁ CHÍNH (Số to, in đậm khách phải trả)
            // Đang sale -> Trả giá sale. Không sale -> Trả giá gốc.
            price: isProductOnSale ? giaSaleTrenDB : giaGocTrenDB,

            // 2. GIÁ PHỤ (Số nhỏ, gạch ngang)
            // Đang sale -> Gạch ngang giá gốc. Không sale -> Không có gạch ngang (null)
            oldPrice: isProductOnSale ? giaGocTrenDB : null,

            isSale: isProductOnSale,
            color: data.color || "STANDARD",
            image: data.image || "https://via.placeholder.com/300",
            category: data.category || "ACCESSORIES",
            sizes: data.sizes || ["S", "M", "L", "XL"],
          };
        });

        setProducts(productList);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        setError("Không thể lấy dữ liệu từ Firebase.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsFromFirebase();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchSize =
        filters.sizes.length === 0 ||
        product.sizes.some((size) => filters.sizes.includes(size));
      const matchPrice = product.price <= filters.maxPrice;
      return matchCategory && matchSize && matchPrice;
    });
  }, [filters, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-20">
        <div className="py-4 border-b-4 border-orange-600 inline-block mb-10">
          <p className="text-xs text-gray-500 tracking-widest font-bold">
            SPRING / SUMMER 2024
          </p>
          <h1 className="text-5xl font-black tracking-tighter uppercase mt-1">
            Shop All
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/4 flex-shrink-0">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="w-full md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : error ? (
              <div className="py-20 text-center text-red-500">
                <p className="font-bold text-lg">Đã có lỗi xảy ra!</p>
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                >
                  Thử lại
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500 font-medium">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                </p>
                <button
                  onClick={() =>
                    setFilters({ categories: [], sizes: [], maxPrice: 1000000 })
                  }
                  className="mt-4 text-orange-600 font-bold underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}
