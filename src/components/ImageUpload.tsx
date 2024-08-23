import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1 rounded-full border border-gray-300 bg-gray-200"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
            <CldImage
              src={url}
              width="200"
              height="200"
              crop="fill"
              className="object-cover"
              alt="Uploaded Image"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
      >
        {({ open }) => {
          return (
            <div className="mb-4">
              <button
                type="button"
                disabled={disabled}
                onClick={open}
                className="p-2 rounded-full border border-gray-300 bg-gray-200 flex items-center"
              >
                <ImagePlus className="h-6 w-6" />
                <span className="ml-2 text-sm">Upload image</span>
              </button>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
