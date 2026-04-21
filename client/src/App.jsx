import "./App.css";
import Shop from "./pages/shop";
import { Routes, Route } from "react-router-dom";
import Admin from "../admin/pages/AdminDashboard";
import ProtectedRoute from "../admin/components/layout/ProtectedRoute";
import Login from "../admin/pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderDetail from "../admin/components/admin/OrderDetail";
import Orders from "../admin/pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FloatingContact from "./components/layout/FloatingContact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/orders/:id" element={<OrderDetail />} />

      {/* TRANG ADMIN ĐÃ BỊ KHÓA: Phải đi qua lớp ProtectedRoute */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
      <FloatingContact />
    </>
  );
}

export default App;
