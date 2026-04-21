import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, QrCode } from "lucide-react";
import { useCart } from "../context/CartContext";
// Remove firebase and emailjs imports

// Import 2 Component
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Các state dùng chung
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderId, setOrderId] = useState("");
  const [savedTotal, setSavedTotal] = useState(0);

  // TÍNH TOÁN CHI PHÍ
  const shippingFee = 0;
  const finalTotal = cartTotal + shippingFee;

  // Xử lý khi nhấn nút Đặt hàng
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    console.log("Đang gửi yêu cầu đặt hàng lên Server...");

    // Tạo mã đơn hàng
    const newOrderId = `GRIT${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Lấy dữ liệu từ Form
    const formElement = document.getElementById("checkout-form");
    const formData = new FormData(formElement);

    const customerInfo = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
    };

    try {
      // 1. GỌI LÊN API SERVER (Node.js)
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          customerInfo,
          paymentMethod,
          finalTotal,
          orderId: newOrderId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Lỗi đặt hàng từ máy chủ");
      }

      // 2. NẾU THÀNH CÔNG -> CHUYỂN GIAO DIỆN
      setOrderId(data.orderId);
      setSavedTotal(finalTotal);
      setIsSuccess(true);
      clearCart();

    } catch (error) {
      alert(error.message);
      console.error("Lỗi đặt hàng: ", error);
    }
  };

  // --- UI: MÀN HÌNH SAU KHI ĐẶT HÀNG THÀNH CÔNG ---
  if (isSuccess) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
        {paymentMethod === "COD" ? (
          <div className="text-center max-w-lg">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-500 mb-8">
              Cảm ơn bạn. Mã đơn hàng của bạn là{" "}
              <span className="font-bold text-gray-900">#{orderId}</span>. Mọi thông tin đã được gửi vào email của bạn.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white border border-gray-200 p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <QrCode className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                Thanh toán VietQR
              </h1>
            </div>

            <p className="text-sm text-gray-500 text-center mb-6">
              Mở ứng dụng ngân hàng và quét mã QR dưới đây để thanh toán. Mọi
              thông tin đã được điền tự động.
            </p>

            <div className="bg-gray-50 p-4 flex justify-center mb-6 border border-gray-100">
              <img
                src={`https://img.vietqr.io/image/970422-966682701-compact2.png?amount=${savedTotal}&addInfo=${orderId}&accountName=LE PHUNG HAO`}
                alt="QR Code Thanh Toán"
                className="w-64 h-64 object-contain mix-blend-multiply"
              />
            </div>

            <div className="bg-blue-50 text-blue-900 p-4 text-sm font-medium space-y-2 mb-8 border border-blue-100">
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="text-blue-700">Ngân hàng:</span>
                <span className="font-bold">MB Bank</span>
              </div>
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="text-blue-700">Chủ tài khoản:</span>
                <span className="font-bold uppercase">LE PHUNG HAO</span>
              </div>
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="text-blue-700">Số tiền:</span>
                <span className="font-black text-orange-600">
                  {savedTotal.toLocaleString()} VND
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Nội dung:</span>
                <span className="font-black">{orderId}</span>
              </div>
            </div>

            <p className="text-xs text-center text-red-500 font-bold mb-6">
              * Lưu ý: Đơn hàng sẽ chỉ được giao sau khi chúng tôi nhận được
              thanh toán.
            </p>
          </div>
        )}
        <Link
          to="/"
          className="mt-8 bg-gray-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // --- UI: NẾU GIỎ HÀNG TRỐNG ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 font-medium mb-4">
          Giỏ hàng của bạn đang trống.
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-orange-600 font-bold underline"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  // --- UI: TRANG CHECKOUT CHÍNH ---
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại giỏ hàng
      </button>

      <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-10">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* CỘT TRÁI: Form điền thông tin */}
        <div className="w-full lg:w-3/5">
          <CheckoutForm
            onSubmit={handlePlaceOrder}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        {/* CỘT PHẢI: Tóm tắt đơn hàng */}
        <div className="w-full lg:w-2/5">
          <OrderSummary shippingFee={shippingFee} finalTotal={finalTotal} />
        </div>
      </div>
    </main>
  );
}