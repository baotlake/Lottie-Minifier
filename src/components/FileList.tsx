import React, { useCallback } from "react";
import { File, Trash2, Download, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FileListProps {
  files: Array<{
    name: string;
    originalSize: number;
    compressedSize: number;
  }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  onDownload: (index: number) => void;
  onFilesAdded: (files: File[]) => void;
  onDownloadAll: () => void;
}

export function FileList({
  files,
  selectedIndex,
  onSelect,
  onDelete,
  onDownload,
  onFilesAdded,
  onDownloadAll,
}: FileListProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: true,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div
          {...getRootProps()}
          className={`
          p-3 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }
        `}
        >
          <input {...getInputProps()} />
          <Upload className="w-5 h-5 mx-auto mb-2 text-gray-500" />
          <p className="text-sm text-gray-600">Drop files or click to upload</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {files.map((file, index) => (
            <div
              key={index}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer
                ${selectedIndex === index ? "bg-blue-50" : ""}`}
              onClick={() => onSelect(index)}
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.compressedSize / 1024).toFixed(2)} KB /{" "}
                    {(file.originalSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(index);
                  }}
                  className="p-1.5 text-gray-600 hover:text-blue-500 rounded-full hover:bg-blue-50"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }}
                  className="p-1.5 text-gray-600 hover:text-red-500 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <button
            className="w-full rounded-lg px-4 py-2 bg-blue-500 text-white"
            onClick={onDownloadAll}
          >
            Download All
          </button>
        </div>
      </div>
    </div>
  );
}
