import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import Header from "../components/layout/Header";
import CartDrawer from "../components/shop/CartDrawer";
import Footer from "../components/layout/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);

        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const isProductOnSale = data.isSale === true;
          const giaSaleTrenDB = data.price || 0;
          const giaGocTrenDB = data.oldPrice || giaSaleTrenDB;

          setProduct({
            id: docSnap.id,
            name: data.name || "Sản phẩm lỗi tên",
            price: isProductOnSale ? giaSaleTrenDB : giaGocTrenDB,
            oldPrice: isProductOnSale ? giaGocTrenDB : null,
            description:
              data.description || "Sản phẩm này chưa có bài mô tả chi tiết.",
            image: data.image || "https://via.placeholder.com/600",
            category: data.category || "ACCESSORIES",
            sizes: data.sizes || ["S", "M", "L", "XL"],
            color: data.color || "STANDARD",
            isSale: isProductOnSale,
          });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Lỗi fetch data từ Firebase:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Đã gộp toàn bộ logic xử lý click vào chung 1 hàm cho sạch sẽ
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ (Size) trước khi thêm vào giỏ hàng!");
      return; // Dừng lại tại đây nếu chưa chọn size
    }
    // Chỉ thêm vào giỏ nếu đã pass qua vòng kiểm tra bên trên
    addToCart({ ...product, selectedSize });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="text-center py-20 font-bold text-gray-500">
        Không tìm thấy sản phẩm
      </div>
    );

  return (
    // THAY ĐỔI CẤU TRÚC LAYOUT: Bọc bằng thẻ div min-h-screen giống hệt bên trang Shop.jsx
    <div className="min-h-screen bg-white">
      {/* Header được đưa ra ngoài thẻ main để giữ độ rộng tuyệt đối và cân bằng */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </button>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 flex-shrink-0 bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[600px] object-contain mix-blend-multiply"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-orange-600">
              {product.category}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-gray-900 text-gray-900"
                />
              ))}
              <span className="text-xs font-bold text-gray-500 ml-2 uppercase">
                (128 Đánh giá)
              </span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-black text-gray-900">
                {product.price.toLocaleString()}đ
              </span>
              {product.oldPrice && (
                <span className="text-xl font-medium text-gray-400 line-through mb-1">
                  {product.oldPrice.toLocaleString()}đ
                </span>
              )}
              {product.isSale && (
                <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-1 mb-2 rounded uppercase tracking-widest">
                  Đang Sale
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-10 leading-relaxed text-sm lg:text-base">
              {product.description}
            </p>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                  Kích cỡ (Size)
                </h3>
                <button className="text-xs text-gray-400 underline hover:text-gray-900">
                  Hướng dẫn chọn size
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-sm font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Gọi trực tiếp hàm handleAddToCart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-600 text-white font-black py-5 uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>

            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <div className="flex flex-col gap-1">
                <span className="text-gray-900 font-bold">Vận chuyển:</span>
                Giao hàng miễn phí toàn quốc
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-900 font-bold">Đổi trả:</span>
                Miễn phí đổi trả trong 30 ngày
              </div>
            </div>
          </div>
        </div>
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}
