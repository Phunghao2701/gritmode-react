import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext"; // Import hook để lấy số lượng giỏ hàng
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  // State để quản lý menu trên điện thoại
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart(); // Sử dụng hook để lấy số lượng sản phẩm trong giỏ hàng

  // Dữ liệu giả lập cho giỏ hàng (sau này bạn thay bằng state thật từ Context/Redux)
  const cartItemCount = cartCount;

  const location = useLocation();
  const currentPath = location.pathname;

  // Mảng chứa các link điều hướng để dễ quản lý và map ra UI
  const navLinks = [
    { name: "SHOP", href: "/", isActive: currentPath === "/" }, 
    { name: "ABOUT", href: "/about", isActive: currentPath === "/about" },
    { name: "CONTACT", href: "/contact", isActive: currentPath === "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/"
              className="text-2xl font-black tracking-tighter uppercase text-gray-900"
            >
              Gritmode
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-bold uppercase tracking-wider relative group ${
                  link.isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.name}
                {/* Đường gạch chân màu cam cho mục đang Active */}
                {link.isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-500"></span>
                )}
                {/* Hiệu ứng hover gạch chân cho các mục khác */}
                {!link.isActive && (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Icons Area (Desktop & Mobile) */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/login"
              className="hidden sm:block text-gray-500 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            {/* Cart Button with Badge */}
            {/* 2. Cập nhật nút button của giỏ hàng */}
            <button
              onClick={openCart} // Thêm onClick ở đây
              className="text-gray-500 hover:text-gray-900 transition-colors relative group"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block px-3 py-3 rounded-md text-base font-bold uppercase ${
                link.isActive
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#"
            className="block px-3 py-3 rounded-md text-base font-bold uppercase text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            ACCOUNT
          </a>
        </div>
      )}
    </header>
  );
}
