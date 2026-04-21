import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/shop/CartDrawer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 pb-24">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 mb-6">
            Liên <span className="text-orange-600">Hệ</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
            Có câu hỏi cần giải đáp hoặc muốn hợp tác? Đừng ngần ngại để lại lời nhắn, đội ngũ Gritmode luôn sẵn sàng đồng hành cùng bạn.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Info */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-8 pb-4 border-b-2 border-gray-100">
                Thông tin liên lạc
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-orange-50 p-4 rounded-full mr-4 text-orange-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 uppercase tracking-widest text-sm">Địa chỉ</h3>
                    <p className="text-gray-500">123 Đường Fashion, Quận 1<br/>TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-50 p-4 rounded-full mr-4 text-orange-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 uppercase tracking-widest text-sm">Điện thoại</h3>
                    <p className="text-gray-500">+84 123 456 789<br/>(Thứ 2 - Thứ 7: 9:00 - 18:00)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-50 p-4 rounded-full mr-4 text-orange-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 uppercase tracking-widest text-sm">Email</h3>
                    <p className="text-gray-500">support@gritmode.vn<br/>hello@gritmode.vn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-2/3 bg-gray-50 p-8 md:p-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-8">
                Gửi lời nhắn
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Họ Tên</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nguyễn Văn A" 
                      className="w-full bg-white border-none p-4 text-gray-900 focus:ring-2 focus:ring-orange-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com" 
                      className="w-full bg-white border-none p-4 text-gray-900 focus:ring-2 focus:ring-orange-600 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Lời nhắn</label>
                  <textarea 
                    rows="5" 
                    required
                    placeholder="Bạn muốn chia sẻ điều gì với chúng tôi?" 
                    className="w-full bg-white border-none p-4 text-gray-900 focus:ring-2 focus:ring-orange-600 outline-none resize-y"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-gray-900 text-white font-black py-4 px-8 uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center gap-3 w-full md:w-auto"
                >
                  Gửi ngay
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
