import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/shop/CartDrawer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 mb-6">
            Câu Chuyện <span className="text-orange-600">Gritmode</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
            Chúng tôi không chỉ bán quần áo, chúng tôi bán phong cách sống. Gritmode ra đời từ niềm đam mê văn hóa đường phố và tham vọng định hình lại tiêu chuẩn thời trang giới trẻ.
          </p>
        </div>

        {/* Image Grid */}
        <div className="w-full bg-gray-50 py-16 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80" 
                  alt="Streetwear Style" 
                  className="w-full h-[500px] object-cover rounded-sm shadow-xl"
                />
              </div>
              <div className="pl-0 md:pl-12 mt-10 md:mt-0">
                <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-6">
                  Tầm nhìn và Sứ mệnh
                </h2>
                <div className="space-y-6 text-gray-600">
                  <p>
                    Được thành lập vào năm 2024, Gritmode nhanh chóng trở thành biểu tượng cho những người trẻ khao khát thể hiện cá tính riêng.
                  </p>
                  <p>
                    Thiết kế của chúng tôi mang đậm tính "Grit" - sự góc cạnh, kiên định và không khoan nhượng. Chúng tôi tin rằng thời trang là vũ khí mạnh mẽ nhất để bạn kể câu chuyện của mình với thế giới mà không cần mở lời.
                  </p>
                  <p className="font-bold text-gray-900">
                    "Wear your attitude. Live your grit."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats / Value */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center border-y border-gray-100 py-12">
                <div>
                    <div className="text-4xl font-black text-orange-600 mb-2">100%</div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Cotton Hữu Cơ</div>
                </div>
                <div>
                    <div className="text-4xl font-black text-orange-600 mb-2">50+</div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Bộ Sưu Tập</div>
                </div>
                <div>
                    <div className="text-4xl font-black text-orange-600 mb-2">24h</div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Hỗ trợ khách hàng</div>
                </div>
            </div>
        </div>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
