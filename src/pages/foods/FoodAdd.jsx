// import React, { useState } from "react";

// const FoodAdd = ({ onAdd, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     description: "",
//     price: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAdd(formData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <form
//         className="relative bg-white rounded-lg shadow-lg p-6 w-1/3"
//         onSubmit={handleSubmit}
//       >
//         <button
//           className="absolute top-2 right-2 text-2xl font-bold cursor-pointer focus:outline-none"
//           onClick={onCancel}
//         >
//           &times;
//         </button>
//         <h2 className="text-xl font-bold mb-4">Add Food Item</h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="file"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Add Food
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FoodAdd;
// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// const FoodAdd = ({ onAdd, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//   });
//   const [imageFile, setImageFile] = useState(null); // Separate state for file

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === "file") {
//       setImageFile(files[0]); // Set file separately
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!imageFile) return;

//     const imageData = new FormData();
//     imageData.append("file", imageFile); // Set the key as 'file'

//     try {
//       const response = await axios.post(
//         `${API_URL}/generic/upload`,
//         imageData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log(response.data.file.filename);
//       // Assume the API response contains the filename in `data.filename`
//       const imageUrl = response.data.file.filename;
//       setFormData((prevData) => ({ ...prevData, image: imageUrl }));
//       console.log("Image uploaded successfully:", imageUrl);
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       alert("Failed to upload image. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await handleImageUpload(); // First upload the image
//     onAdd(formData); // Pass complete form data including the uploaded image URL
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <form
//         className="relative bg-white rounded-lg shadow-lg p-6 w-1/3"
//         onSubmit={handleSubmit}
//       >
//         <button
//           className="absolute top-2 right-2 text-2xl font-bold cursor-pointer focus:outline-none"
//           onClick={onCancel}
//         >
//           &times;
//         </button>
//         <h2 className="text-xl font-bold mb-4">Add Food Item</h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="file"
//             name="file" // Set to match backend key
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Add Food
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FoodAdd;
import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const FoodAdd = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for file

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImageFile(files[0]); // Set file separately
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const imageData = new FormData();
    imageData.append("file", imageFile); // Set the key as 'file'

    try {
      const response = await axios.post(
        `${API_URL}/generic/upload`,
        imageData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = response.data.file.filename;
      return imageUrl; // Return the image URL to use it later
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload(); // Wait for the image URL

    if (imageUrl) {
      // Update formData with the image URL and call onAdd
      const updatedFormData = { ...formData, image: imageUrl };
      onAdd(updatedFormData); // Pass the complete data
    } else {
      console.error("Image URL not available, submission cancelled.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form
        className="relative bg-white rounded-lg shadow-lg p-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold cursor-pointer focus:outline-none"
          onClick={onCancel}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add Food Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            name="file" // Set to match backend key
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodAdd;
