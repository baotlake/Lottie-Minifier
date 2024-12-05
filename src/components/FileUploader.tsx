import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { navigate } from "astro:transitions/client";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

export function FileUploader({ onFilesSelected }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-gray-600">
        <Upload className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium mb-2">
          {isDragActive
            ? "Drop your Lottie files here"
            : "Drag & drop Lottie files here"}
        </p>
        <p className="text-sm text-gray-500">or click to select files</p>
      </div>
    </div>
  );
}
