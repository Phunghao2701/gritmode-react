import { useState, useEffect } from "react";

export default function CheckoutForm({
  onSubmit,
  paymentMethod,
  setPaymentMethod,
}) {
  // States lưu trữ danh sách từ API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // States lưu trữ lựa chọn của người dùng
  const [selectedProvince, setSelectedProvince] = useState({ code: "", name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ code: "", name: "" });
  const [selectedWard, setSelectedWard] = useState({ code: "", name: "" });
  const [street, setStreet] = useState("");

  // 1. Lấy danh sách Tỉnh/Thành phố ngay khi tải trang
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Lỗi lấy tỉnh thành:", err));
  }, []);

  // 2. Lấy danh sách Quận/Huyện khi Tỉnh/Thành phố thay đổi
  useEffect(() => {
    if (selectedProvince.code) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts || []))
        .catch((err) => console.error("Lỗi lấy quận huyện:", err));
    } else {
      setDistricts([]);
    }
    // Đổi Tỉnh thì reset Huyện và Xã
    setSelectedDistrict({ code: "", name: "" });
    setSelectedWard({ code: "", name: "" });
  }, [selectedProvince.code]);

  // 3. Lấy danh sách Phường/Xã khi Quận/Huyện thay đổi
  useEffect(() => {
    if (selectedDistrict.code) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards || []))
        .catch((err) => console.error("Lỗi lấy phường xã:", err));
    } else {
      setWards([]);
    }
    // Đổi Huyện thì reset Xã
    setSelectedWard({ code: "", name: "" });
  }, [selectedDistrict.code]);

  // Tự động gộp thành chuỗi địa chỉ hoàn chỉnh để gửi lên form (Ngăn cách bằng dấu phẩy)
  const fullAddress = [street, selectedWard.name, selectedDistrict.name, selectedProvince.name]
    .filter(Boolean)
    .join(", ");

  return (
    <form id="checkout-form" onSubmit={onSubmit} className="space-y-8">
      {/* INPUT ẨN: Truyền chuỗi địa chỉ đầy đủ lên file cha (Checkout.jsx) */}
      <input type="hidden" name="address" value={fullAddress} />

      {/* 1. Thông tin liên hệ */}
      <div>
        <h2 className="text-lg font-black uppercase tracking-widest mb-4 border-b pb-2">
          Thông tin giao hàng
        </h2>
        <div className="space-y-4">
          <input
            name="fullName"
            required
            type="text"
            placeholder="Họ và tên"
            className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="phone"
              required
              type="text"
              placeholder="Số điện thoại"
              className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          {/* KHU VỰC CHỌN ĐỊA CHỈ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tỉnh/Thành phố */}
            <select
              required
              value={selectedProvince.code ? `${selectedProvince.code}|${selectedProvince.name}` : ""}
              onChange={(e) => {
                const [code, name] = e.target.value.split("|");
                setSelectedProvince({ code, name });
              }}
              className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="" disabled>Chọn Tỉnh/Thành</option>
              {provinces.map((p) => (
                <option key={p.code} value={`${p.code}|${p.name}`}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Quận/Huyện */}
            <select
              required
              disabled={!selectedProvince.code}
              value={selectedDistrict.code ? `${selectedDistrict.code}|${selectedDistrict.name}` : ""}
              onChange={(e) => {
                const [code, name] = e.target.value.split("|");
                setSelectedDistrict({ code, name });
              }}
              className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled>Chọn Quận/Huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={`${d.code}|${d.name}`}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Phường/Xã */}
            <select
              required
              disabled={!selectedDistrict.code}
              value={selectedWard.code ? `${selectedWard.code}|${selectedWard.name}` : ""}
              onChange={(e) => {
                const [code, name] = e.target.value.split("|");
                setSelectedWard({ code, name });
              }}
              className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled>Chọn Phường/Xã</option>
              {wards.map((w) => (
                <option key={w.code} value={`${w.code}|${w.name}`}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Số nhà / Đường */}
          <input
            required
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Số nhà, tên đường, tòa nhà..."
            className="w-full border border-gray-300 p-3 outline-none focus:border-gray-900 bg-gray-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* 2. Phương thức thanh toán */}
      <div>
        <h2 className="text-lg font-black uppercase tracking-widest mb-4 border-b pb-2">
          Thanh toán
        </h2>
        <div className="space-y-3">
          {/* COD */}
          <label
            className={`border p-4 flex items-center gap-3 cursor-pointer transition-colors ${
              paymentMethod === "COD" ? "border-orange-600 bg-orange-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 accent-orange-600"
            />
            <span className="text-sm font-bold text-gray-900 uppercase">
              Thanh toán khi nhận hàng (COD)
            </span>
          </label>

          {/* VietQR */}
          <label
            className={`border p-4 flex items-center gap-3 cursor-pointer transition-colors ${
              paymentMethod === "BANKING" ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="BANKING"
              checked={paymentMethod === "BANKING"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-bold text-gray-900 uppercase">
              Chuyển khoản ngân hàng (VietQR)
            </span>
          </label>
        </div>
      </div>
    </form>
  );
}