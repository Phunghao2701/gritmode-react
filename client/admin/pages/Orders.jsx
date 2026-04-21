import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Home,
  Package,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../src/firebase/firebase";
import OrderDetail from "../components/admin/OrderDetail";
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State quản lý Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Lắng nghe đơn hàng Realtime
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Lỗi lấy đơn hàng: ", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // 2. Hàm xử lý format ngày tháng từ Firebase Timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    // Nếu là object Timestamp của Firebase
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString("vi-VN");
    }
    // Nếu là string thông thường
    return new Date(timestamp).toLocaleString("vi-VN");
  };

  // 3. Hàm mở Modal xem chi tiết
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // 4. Hàm cập nhật trạng thái đơn hàng lên Firebase
  const updateOrderStatus = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      const orderRef = doc(db, "orders", selectedOrder.id);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái: ", error);
      alert("Cập nhật thất bại!");
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span style={{ backgroundColor: '#fef3c7', color: '#92400e' }} className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1 w-max">
            <Clock className="w-3 h-3" /> Chờ xử lý
          </span>
        );
      case "PAID":
        return (
          <span style={{ backgroundColor: '#dcfce7', color: '#166534' }} className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1 w-max">
            <CheckCircle className="w-3 h-3" /> Đã thanh toán
          </span>
        );
      case "DELIVERED":
        return (
          <span style={{ backgroundColor: '#dcfce7', color: '#166534' }} className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1 w-max">
            <CheckCircle className="w-3 h-3" /> Đã giao
          </span>
        );
      case "CANCELLED":
        return (
          <span style={{ backgroundColor: '#fee2e2', color: '#991b1b' }} className="px-3 py-1 text-xs font-bold rounded flex items-center gap-1 w-max">
            <XCircle className="w-3 h-3" /> Đã hủy
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }} className="px-3 py-1 text-xs font-bold rounded w-max">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans pb-12">
      {/* HEADER ĐIỀU HƯỚNG */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wide text-gray-900">
            Quản Lý Đơn Hàng
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Theo dõi và cập nhật trạng thái giao hàng
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded shadow-sm hover:bg-gray-50 font-medium transition-colors text-sm"
          >
            <Home className="w-4 h-4" /> Xem Shop
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded shadow-sm hover:bg-gray-800 font-bold transition-colors text-sm"
          >
            <Package className="w-4 h-4" /> Quản lý Kho
          </Link>
        </div>
      </div>

      {/* BẢNG DANH SÁCH ĐƠN HÀNG */}
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm overflow-hidden rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500">
                <th className="p-4 font-bold">Mã Đơn</th>
                <th className="p-4 font-bold">Ngày Đặt</th>
                <th className="p-4 font-bold">Khách Hàng</th>
                <th className="p-4 font-bold">Thanh Toán</th>
                <th className="p-4 font-bold">Trạng Thái</th>
                <th className="p-4 font-bold">Tổng Tiền</th>
                <th className="p-4 font-bold text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-gray-900 border-solid rounded-full animate-spin"></div>
                      Đang tải dữ liệu...
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">
                      Chưa có đơn hàng nào.
                    </p>
                    <p className="text-sm">
                      Khi khách hàng đặt mua, đơn hàng sẽ xuất hiện tại đây.
                    </p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-bold text-gray-900">
                      #{order.orderId || order.id.substring(0, 6)}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.customerPhone}
                      </p>
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-500">
                      {order.paymentMethod}
                    </td>
                    <td className="p-4">{renderStatusBadge(order.status)}</td>
                    <td className="p-4 font-black text-gray-900">
                      {order.total?.toLocaleString()}đ
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => openModal(order)}
                        className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GỌI COMPONENT ORDER DETAIL VÀ TRUYỀN PROPS */}
      {isModalOpen && selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
          onUpdateStatus={updateOrderStatus}
          formatDate={formatDate}
          renderStatusBadge={renderStatusBadge}
        />
      )}
    </div>
  );
}
