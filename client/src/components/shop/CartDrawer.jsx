import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <>
      {/* Lớp Overlay đen mờ phía sau */}
      {/* Dùng transition để hiệu ứng fade in/out mượt mà */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart} // Click ra ngoài để đóng
      />

      {/* Drawer trượt từ phải ra */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header của Giỏ hàng */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-black uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nội dung Giỏ hàng (Có thể scroll nếu nhiều đồ) */}
        <div className="flex-grow overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag className="w-12 h-12 text-gray-200" />
              <p className="font-medium">Giỏ hàng của bạn đang trống.</p>
              <button
                onClick={closeCart}
                className="text-orange-600 font-bold underline"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Ảnh sản phẩm */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-gray-100"
                  />

                  {/* Chi tiết sản phẩm */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-gray-900 uppercase line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 uppercase">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Bộ điều chỉnh số lượng */}
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-bold text-center w-8">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Giá tiền */}
                      <p className="text-sm font-black text-gray-900">
                        {(item.price * item.quantity).toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (Tính tiền & Checkout) */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </span>
              <span className="text-xl font-black text-gray-900">
                {cartTotal.toLocaleString()} VND
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Thuế và phí ship sẽ được tính ở bước thanh toán.
            </p>
            <Link to="/checkout">
              <button className="w-full bg-orange-600 text-white font-bold py-4 uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
