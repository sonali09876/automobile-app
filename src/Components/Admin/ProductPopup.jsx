import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ProductPopup = ({
  showProductPopup,
  setShowProductPopup,
  productForm,
  setProductForm,
  handleProductFormChange,
  handleAddProduct,
  handleUpdateProduct,
  uploading,
  isEditMode,

  // image + crop props
  onSelectFile,
  imageSrc,
  setImageSrc,
  crop,
  setCrop,
  completedCrop,
  setCompletedCrop,
  zoom,
  setZoom,
  imgRef,
  onImageLoad,
  applyCrop,
}) => {
  if (!showProductPopup) return null;

  // Static default image
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Vehicle" : "Add New Vehicle"}
          </h2>

          <button
            onClick={() => setShowProductPopup(false)}
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">

          {/* NAME */}
          <div>
            <label className="block font-medium mb-1">Product Name *</label>
            <input
              type="text"
              name="productName"
              value={productForm.productName}
              onChange={handleProductFormChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* IMAGE SECTION */}
          <div className="space-y-3">
            <label className="block font-medium">Vehicle Image</label>

            <div className="flex items-center gap-4">
              {/* Select Image Button */}
              <label className="px-4 py-2 bg-gray-100 border border-dashed cursor-pointer rounded">
                Select Image
                <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
              </label>

              {/* preview (static + uploaded) */}
              <img
                src={productForm.image || defaultImage}
                className="w-20 h-20 border rounded object-cover"
                alt="preview"
              />
            </div>

            {/* CROP AREA */}
            {imageSrc && (
              <div className="mt-3 border rounded-lg p-3 bg-gray-50">
                <p className="font-medium mb-2">Crop Image</p>

                <div className="max-h-[280px] overflow-auto bg-black/5 flex justify-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={4 / 3}
                  >
                    <img
                      ref={imgRef}
                      src={imageSrc}
                      onLoad={onImageLoad}
                      style={{ transform: `scale(${zoom})` }}
                      alt="crop-source"
                    />
                  </ReactCrop>
                </div>

                {/* CROP CONTROLS */}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                    className="px-3 py-1 border rounded"
                  >
                    ➖ Zoom Out
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                    className="px-3 py-1 border rounded"
                  >
                    ➕ Zoom In
                  </button>

                  <button
                    onClick={applyCrop}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Apply Crop
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={isEditMode ? handleUpdateProduct : handleAddProduct}
              disabled={uploading}
              className="flex-1 bg-blue-600 text-white py-3 rounded"
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </button>

            <button
              onClick={() => setShowProductPopup(false)}
              className="flex-1 bg-gray-300 py-3 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
