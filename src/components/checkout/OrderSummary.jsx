// File: src/components/Checkout/OrderSummary.jsx
import { useCart } from "../../context/CartContext";

export default function OrderSummary({ shippingFee, finalTotal }) {
  const { cartItems, cartTotal } = useCart();

  return (
    <div className="bg-gray-50 p-8 border border-gray-100 sticky top-24">
      <h2 className="text-lg font-black uppercase tracking-widest mb-6">
        Tóm tắt đơn hàng
      </h2>

      {/* List sản phẩm */}
      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
        {cartItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex justify-between items-center text-sm"
          >
            <span className="font-bold">
              {item.quantity} x {item.name}
            </span>
            <span>{(item.price * item.quantity).toLocaleString()} VND</span>
          </div>
        ))}
      </div>

      {/* Cột tính tiền */}
      <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính</span>
          <span className="font-bold">{cartTotal.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Phí giao hàng</span>
          <span className="font-bold">{shippingFee.toLocaleString()} VND</span>
        </div>
      </div>

      <div className="border-t border-gray-900 mt-4 pt-4 flex justify-between items-center">
        <span className="text-base font-black uppercase tracking-widest text-gray-900">
          Tổng cộng
        </span>
        <span className="text-2xl font-black text-black-600">
          {finalTotal.toLocaleString()} VND
        </span>
      </div>

      {/* Nút Submit Form - Thuộc tính form="checkout-form" sẽ liên kết với form bên Component kia */}
      <button
        type="submit"
        form="checkout-form"
        className="w-full bg-orange-600 text-white font-black py-5 mt-8 uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-xl shadow-orange-600/20"
      >
        Hoàn tất đặt hàng
      </button>
    </div>
  );
}
