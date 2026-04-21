import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-widest mb-4">
              GRITMODE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Phong cách tối giản, chất lượng tối đa. Chúng tôi mang đến những
              thiết kế thời trang hiện đại, đề cao sự thoải mái và cái tôi cá
              nhân.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white font-bold transition-colors"
              >
                FB
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white font-bold transition-colors"
              >
                IG
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white font-bold transition-colors"
              >
                X
              </a>
            </div>
          </div>

          {/* CỘT 2: KHÁM PHÁ (Links) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">
              Khám Phá
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Cửa hàng (Shop)
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Bộ sưu tập mới
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỖ TRỢ KHÁCH HÀNG */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Đổi trả & Hoàn tiền
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Hướng dẫn chọn size
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 4: LIÊN HỆ */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">
              Liên Hệ
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-gray-500" />
                <span>
                  Khu Công nghệ cao, Phường Long Thạnh Mỹ, TP. Thủ Đức, TP. HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-gray-500" />
                <span>0901 695 086</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-gray-500" />
                <span>support@gritmode.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM: COPYRIGHT & PAYMENT LOGOS */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} GRITMODE. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex justify-center items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
              alt="Mastercard"
              className="h-5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
