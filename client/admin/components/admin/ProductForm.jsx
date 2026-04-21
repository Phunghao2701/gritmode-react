// File: src/admin/components/ProductForm.jsx

export default function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
  isLoading,
  cancelEdit,
  // Props cho Danh mục
  categories,
  isAddingCategory,
  setIsAddingCategory,
  newCategoryName,
  setNewCategoryName,
  handleCategorySelectChange,
  handleSaveNewCategory,
  setFormData,
  // Props cho Ảnh
  imagePreview,
  handleDragOver,
  handleDrop,
  handleFileSelect,
}) {
  return (
    <div className="w-full md:w-1/3 flex flex-col gap-6">
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm Mới"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Tên SP */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên sản phẩm
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Giá gốc & Tồn kho */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Giá gốc (VNĐ)
              </label>
              <input
                required
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Tồn kho</label>
              <input
                required
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* QUẢN LÝ DANH MỤC TRỰC TIẾP */}
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            {!isAddingCategory ? (
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleCategorySelectChange}
                className="w-full border p-2 rounded bg-white cursor-pointer"
              >
                {categories.length === 0 ? (
                  <option value="" disabled>
                    Chưa có danh mục nào
                  </option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
                <option
                  value="ADD_NEW_CATEGORY"
                  className="font-bold text-blue-600 bg-blue-50"
                >
                  + Thêm danh mục mới...
                </option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nhập tên danh mục..."
                  className="flex-1 border border-blue-400 p-2 rounded outline-none focus:ring-2 focus:ring-blue-300"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveNewCategory}
                  className="bg-blue-600 text-black px-3 py-2 rounded hover:bg-blue-700 font-medium"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCategory(false);
                    setNewCategoryName("");
                    setFormData((prev) => ({
                      ...prev,
                      category: categories.length > 0 ? categories[0].name : "",
                    }));
                  }}
                  className="bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400 font-medium"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>

          {/* Khu vực trạng thái Sale */}
          <div className="bg-white p-3 border rounded-md mt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isSale"
                checked={formData.isSale}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer"
              />
              <label className="font-medium text-red-600">Đang Sale?</label>
            </div>
            {formData.isSale && (
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1 text-red-600">
                  Giá khuyến mãi (VNĐ) *
                </label>
                <input
                  required={formData.isSale}
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  placeholder="Nhập giá mới..."
                  className="w-full border-2 border-red-300 p-2 rounded focus:outline-none focus:border-red-500"
                />
              </div>
            )}
          </div>

          {/* Upload Ảnh */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hình ảnh sản phẩm
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 transition-colors relative cursor-pointer bg-white"
            >
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-32 object-contain"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600 justify-center mt-2">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500"
                  >
                    <span>
                      {imagePreview ? "Chọn ảnh khác" : "Tải ảnh lên"}
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileSelect}
                    />
                  </label>
                  {!imagePreview && (
                    <p className="pl-1">hoặc kéo thả vào đây</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nút Submit */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gray-900 text-white font-bold py-3 rounded hover:bg-gray-800 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>{" "}
                  Đang lưu...
                </>
              ) : editingId ? (
                "Cập Nhật"
              ) : (
                "Lưu Sản Phẩm"
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={isLoading}
                className="bg-red-500 text-white font-bold py-3 px-4 rounded hover:bg-red-600 disabled:opacity-50"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
