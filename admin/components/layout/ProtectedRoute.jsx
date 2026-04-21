import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../src/firebase/firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Lính gác kiểm tra thẻ: Firebase sẽ tự báo cho ta biết user có đang đăng nhập hay ko
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  // Nếu không có user (chưa đăng nhập), ép chuyển hướng (Navigate) về trang /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập thành công, mở cửa cho vào (hiển thị nội dung bên trong)
  return children;
}
