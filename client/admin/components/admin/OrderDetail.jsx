// File: src/admin/components/OrderDetail.jsx
import {
  X,
  Phone,
  MapPin,
  User,
  Package,
  CreditCard,
  Clock,
} from "lucide-react";

export default function OrderDetail({
  order,
  onClose,
  onUpdateStatus,
  formatDate,
  renderStatusBadge,
}) {
  if (!order) return null;

  return (
    // Overlay: bg-black/50 để làm nổi bật cái hộp ở giữa
    <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 md:p-10 backdrop-blur-sm">
      {/* Cái Hộp chính (Modal Card) */}
      <div className="bg-white w-full max-w-2xl max-h-full flex flex-col rounded-2xl shadow-2xl relative overflow-hidden border border-slate-200">
        {/* Nút X: Cố định ở góc trên bên phải của CÁI HỘP */}
        <button
          onClick={onClose}
          style={{ top: '16px', right: '16px' }}
          className="absolute p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all z-[100] bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Nội dung có thể cuộn bên trong hộp */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/30">
            <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
              Hệ thống quản trị
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
              #{order.orderId || order.id.substring(0, 6)}
            </h2>

            <div className="flex flex-wrap gap-3 mt-4 items-center">
              {renderStatusBadge(order.status)}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                <CreditCard className="w-3.5 h-3.5" />
                {order.paymentMethod}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(order.createdAt)}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Grid Thông tin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 uppercase text-[9px] font-black tracking-widest mb-3">
                  <User className="w-3 h-3" /> Người mua
                </div>
                <p className="font-bold text-slate-900">{order.customerName}</p>
                <p className="text-sm text-slate-500 mt-1 italic">
                  {order.customerPhone}
                </p>
                <p className="text-sm text-slate-500 mt-1 italic">
                  {order.customerEmail}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 uppercase text-[9px] font-black tracking-widest mb-3">
                  <MapPin className="w-3 h-3" /> Địa chỉ nhận
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {order.customerAddress}
                </p>
              </div>
            </div>

            {/* Sản phẩm */}
            <div>
              <div className="flex items-center gap-2 text-slate-900 uppercase text-xs font-black tracking-widest mb-4">
                <Package className="w-4 h-4" /> Danh sách món hàng
              </div>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg shadow-sm bg-slate-100"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-800 text-sm uppercase truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] mt-1 font-bold text-slate-400 uppercase">
                        Size: {item.selectedSize || "N/A"}
                      </p>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <p className="text-[10px] text-slate-400 font-medium">
                        {item.quantity} x {item.price?.toLocaleString()}đ
                      </p>
                      <p className="font-bold text-slate-900">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Cố định ở đáy hộp */}
        <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-end mb-6">
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
              Tổng thanh toán
            </span>
            <span className="font-black text-gray-900 text-3xl tracking-tighter">
              {order.total?.toLocaleString()}đ
            </span>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-2">
            <button
              onClick={() => onUpdateStatus("PAID")}
              style={{ backgroundColor: '#0f172a' }}
              className="px-4 py-3 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all rounded-xl active:scale-95"
            >
              Đã Thanh toán
            </button>
            <button
              onClick={() => onUpdateStatus("DELIVERED")}
              style={{ backgroundColor: '#2563eb' }}
              className="px-4 py-3 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all rounded-xl active:scale-95"
            >
              Giao hàng
            </button>
            <button
              onClick={() => onUpdateStatus("CANCELLED")}
              className="col-span-2 px-4 py-3 bg-white border border-red-200 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all rounded-xl active:scale-95 sm:ml-auto"
            >
              Hủy đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
