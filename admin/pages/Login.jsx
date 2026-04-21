import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Dùng để chuyển trang sau khi đăng nhập thành công

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Gọi hàm đăng nhập của Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Nếu thành công, chuyển hướng thẳng vào trang admin
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Sai email hoặc mật khẩu. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Đăng Nhập</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="admin@shop.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-gray-900 text-white font-bold py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Đang kiểm tra..." : "Đăng Nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
