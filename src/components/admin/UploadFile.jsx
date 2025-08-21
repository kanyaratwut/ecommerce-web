import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { uploadFiles, removeFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const UploadFile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // [] empty

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image`);
          continue;
        }

        //image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint backend
            uploadFiles(token, data)
              .then((res) => {
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Upload image success");
              })
              .catch((err) => {
                setIsLoading(false);
                toast.error("Upload image failed");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    setIsLoading(true);
    const images = form.images;

    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = images.filter(
          (item) => item.public_id !== public_id
        );
        setForm({
          ...form,
          images: filterImages,
        });
        toast.success(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Delete image failed");
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
          // isLoading
          isLoading && (
            <Loader className="w-16 h-16 text-pink-500 animate-spin" />
          )
        }

        {form.images?.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 object-cover" src={item.url} alt="" />
            <span
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded hover:scale-105 cursor-pointer"
              onClick={() => handleDelete(item.public_id)}
            >
              x
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          type="file"
          accept="image/*"
          name="images"
          multiple
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default UploadFile;
