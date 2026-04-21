import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Package } from "lucide-react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../src/firebase/firebase";

import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";

function Admin() {
  // === STATE SẢN PHẨM & DANH MỤC ===
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    salePrice: "",
    stock: "",
    category: "",
    isSale: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // === NÂNG CẤP LÊN REALTIME (Thay thế getDocs cũ) ===
  useEffect(() => {
    // 1. Lắng nghe Danh mục (Categories) realtime
    const qCategories = query(collection(db, "categories"));
    const unsubCategories = onSnapshot(qCategories, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
      // Tự động chọn danh mục đầu tiên nếu form đang trống
      if (data.length > 0) {
        setFormData((prev) =>
          prev.category ? prev : { ...prev, category: data[0].name },
        );
      }
    });

    // 2. Lắng nghe Sản phẩm (Products) realtime
    const qProducts = query(collection(db, "products"));
    const unsubProducts = onSnapshot(qProducts, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    // Cleanup khi rời trang
    return () => {
      unsubCategories();
      unsubProducts();
    };
  }, []);

  // === XỬ LÝ FORM & ẢNH ===
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Vui lòng chỉ tải lên file hình ảnh!");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // === QUẢN LÝ DANH MỤC ===
  const handleCategorySelectChange = (e) => {
    const value = e.target.value;
    if (value === "ADD_NEW_CATEGORY") {
      setIsAddingCategory(true);
      setFormData((prev) => ({ ...prev, category: "" }));
    } else {
      setIsAddingCategory(false);
      setFormData((prev) => ({ ...prev, category: value }));
    }
  };

  const handleSaveNewCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }
    const uppercaseName = newCategoryName.trim().toUpperCase();
    if (categories.some((c) => c.name === uppercaseName)) {
      alert("Danh mục này đã tồn tại!");
      return;
    }
    try {
      await addDoc(collection(db, "categories"), { name: uppercaseName });
      alert("Thêm danh mục thành công!");
      setNewCategoryName("");
      setIsAddingCategory(false);
      setFormData((prev) => ({ ...prev, category: uppercaseName }));
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      alert("Lỗi khi thêm danh mục!");
    }
  };

  // === XÓA SẢN PHẨM ===
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        // Không cần gọi fetchProducts() nữa vì đã có onSnapshot tự lo!
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert("Lỗi khi xóa sản phẩm!");
      }
    }
  };

  // === CHUẨN BỊ SỬA SẢN PHẨM ===
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setIsAddingCategory(false);

    const basePriceForm = product.isSale
      ? product.oldPrice || product.price
      : product.price;
    const salePriceForm = product.isSale
      ? product.oldPrice
        ? product.price
        : product.salePrice
      : "";

    setFormData({
      name: product.name,
      basePrice: basePriceForm,
      salePrice: salePriceForm,
      stock: product.stock,
      category: product.category,
      isSale: product.isSale || false,
    });
    setImagePreview(product.image);
    setImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingCategory(false);
    setFormData({
      name: "",
      basePrice: "",
      salePrice: "",
      stock: "",
      category: categories.length > 0 ? categories[0].name : "",
      isSale: false,
    });
    setImageFile(null);
    setImagePreview(null);
  };

  // === LƯU (THÊM/SỬA) SẢN PHẨM ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAddingCategory) {
      alert("Vui lòng lưu Danh mục mới hoặc Hủy bỏ trước khi lưu Sản phẩm!");
      return;
    }
    if (!formData.category) {
      alert("Vui lòng chọn hoặc thêm một danh mục cho sản phẩm!");
      return;
    }
    if (
      formData.isSale &&
      (!formData.salePrice || Number(formData.salePrice) <= 0)
    ) {
      alert("Vui lòng nhập giá khuyến mãi hợp lệ khi chọn Đang Sale!");
      return;
    }
    if (!editingId && !imageFile) {
      alert("Vui lòng chọn hoặc kéo thả một hình ảnh!");
      return;
    }

    setIsLoading(true);

    try {
      let uploadedImageUrl = imagePreview;

      // 1. TẢI ẢNH LÊN CLOUDINARY
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("upload_preset", "gritmode_upload_image");
        uploadData.append("cloud_name", "dmyxfjje9");

        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dmyxfjje9/image/upload",
          { method: "POST", body: uploadData },
        );

        const cloudinaryData = await cloudinaryResponse.json();
        if (!cloudinaryResponse.ok)
          throw new Error(
            cloudinaryData.error?.message || "Lỗi khi upload ảnh",
          );
        uploadedImageUrl = cloudinaryData.secure_url;
      }

      // 2. CHUẨN BỊ DATA
      const productData = {
        name: formData.name,
        stock: Number(formData.stock),
        image: uploadedImageUrl,
        category: formData.category,
        isSale: formData.isSale,
        price: formData.isSale
          ? Number(formData.salePrice)
          : Number(formData.basePrice),
        oldPrice: formData.isSale ? Number(formData.basePrice) : null,
      };

      // 3. LƯU VÀO FIRESTORE
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        alert("Cập nhật sản phẩm thành công!");
      } else {
        productData.sizes = ["S", "M", "L", "XL"];
        productData.color = "STANDARD";
        await addDoc(collection(db, "products"), productData);
        alert("Thêm sản phẩm thành công!");
      }

      cancelEdit();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // === GIAO DIỆN (ĐÃ ĐƯỢC CHỈNH LẠI CHO ĐẸP & ĐỒNG BỘ) ===
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans pb-12">
      {/* HEADER ĐIỀU HƯỚNG */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wide text-gray-900">
            Quản Lý Sản Phẩm
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Thêm mới, chỉnh sửa và theo dõi tồn kho
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded shadow-sm hover:bg-gray-50 font-medium transition-colors text-sm"
          >
            <Home className="w-4 h-4" /> Xem Shop
          </Link>

          {/* Đổi nút này thành màu đen/trắng cho sang trọng, giống phong cách trang Orders */}
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded shadow-sm hover:bg-gray-800 font-bold transition-colors text-sm"
          >
            <Package className="w-4 h-4" /> Xem Đơn Hàng
          </Link>
        </div>
      </div>

      {/* KHU VỰC NỘI DUNG CHÍNH (Form & Bảng) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* FORM THÊM SẢN PHẨM */}
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
          isLoading={isLoading}
          cancelEdit={cancelEdit}
          categories={categories}
          isAddingCategory={isAddingCategory}
          setIsAddingCategory={setIsAddingCategory}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          handleCategorySelectChange={handleCategorySelectChange}
          handleSaveNewCategory={handleSaveNewCategory}
          setFormData={setFormData}
          imagePreview={imagePreview}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
        />

        {/* BẢNG TỒN KHO */}
        <ProductTable
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Admin;
