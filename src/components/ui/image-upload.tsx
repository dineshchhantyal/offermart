"use client";

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      try {
        setIsUploading(true);

        const uploadPromises = acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Upload failed");

          const data = await response.json();
          return data.url;
        });

        const urls = await Promise.all(uploadPromises);
        onChange([...value, ...urls]);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [value, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles,
    disabled: value.length >= maxFiles || isUploading,
  });

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {value.map((url, index) => (
          <div key={url} className="relative aspect-square">
            <div className="absolute top-2 right-2 z-10">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="bg-red-500 p-1 rounded-full hover:bg-red-600 transition"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            <Image
              src={url}
              alt="Product image"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300"}
          ${
            value.length >= maxFiles || isUploading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-sm">
          <Upload className="h-10 w-10 mb-2 text-gray-400" />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop your images here"
              : "Drag & drop images or click to select"}
          </p>
          <p className="text-gray-400 mt-2">
            {`${value.length}/${maxFiles} images uploaded`}
          </p>
          {isUploading && <p className="text-primary mt-2">Uploading...</p>}
        </div>
      </div>
    </div>
  );
}
