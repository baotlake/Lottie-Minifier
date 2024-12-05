import React, { useState, useEffect } from "react";
import { CompressionOptions } from "../components/CompressionOptions";
import { LottiePreview } from "../components/LottiePreview";
import { FileList } from "../components/FileList";
import { LayerList } from "../components/LayerList";
import { compressLottie } from "../utils/lottieCompressor";
import { processLottieFile } from "../utils/fileProcessor";

interface LottieFile {
  name: string;
  original: any;
  compressed: any;
  originalSize: number;
  compressedSize: number;
  layers: Array<{ name: string; enabled: boolean; index: number }>;
}

type Props = {
  defaultFiles?: LottieFile[];
};

export function Editor({ defaultFiles = [] }: Props) {
  const [files, setFiles] = useState<LottieFile[]>(defaultFiles);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [options, setOptions] = useState({
    precision: 1,
    keepMeta: false,
    keepNm: true,
    keepMn: false,
  });

  const handleFilesAdded = async (newFiles: File[]) => {
    const processedFiles = await Promise.all(newFiles.map(processLottieFile));
    setFiles((prev) => [...prev, ...processedFiles]);
  };

  const handleOptionsChange = (newOptions: typeof options) => {
    setOptions(newOptions);
    setFiles(
      files.map((file) => {
        const compressed = compressLottie(file.original, newOptions);
        return {
          ...file,
          compressed,
          compressedSize: new Blob([JSON.stringify(compressed)]).size,
        };
      })
    );
  };

  const handleLayerToggle = (layerIndex: number) => {
    const file = files[selectedIndex];
    const updatedLayers = file.layers.map((layer, idx) =>
      idx === layerIndex ? { ...layer, enabled: !layer.enabled } : layer
    );

    // Create a new compressed version with the layer removed/added
    const modifiedOriginal = {
      ...file.original,
      layers: file.original.layers.filter(
        (_, idx) => updatedLayers[idx].enabled
      ),
    };

    const compressed = compressLottie(modifiedOriginal, options);

    const updatedFiles = files.map((f, idx) =>
      idx === selectedIndex
        ? {
            ...f,
            layers: updatedLayers,
            compressed,
            compressedSize: new Blob([JSON.stringify(compressed)]).size,
          }
        : f
    );

    setFiles(updatedFiles);
  };

  const handleDownload = (index: number) => {
    const file = files[index];
    const blob = new Blob([JSON.stringify(file.compressed)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    const allFiles = files.map((file) => file.compressed);
    allFiles.forEach((file) => {
      const blob = new Blob([JSON.stringify(file)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <CompressionOptions options={options} onChange={handleOptionsChange} />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r bg-gray-50">
          <FileList
            files={files}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onDelete={(index) => {
              setFiles(files.filter((_, i) => i !== index));
              if (selectedIndex === index) {
                setSelectedIndex(Math.max(0, index - 1));
              }
            }}
            onDownload={handleDownload}
            onFilesAdded={handleFilesAdded}
            onDownloadAll={handleDownloadAll}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {files[selectedIndex] && (
            <LottiePreview
              original={files[selectedIndex].original}
              compressed={files[selectedIndex].compressed}
              originalSize={files[selectedIndex].originalSize}
              compressedSize={files[selectedIndex].compressedSize}
            />
          )}
        </div>

        <div className="w-64 border-l bg-gray-50">
          {files[selectedIndex] && (
            <LayerList
              layers={files[selectedIndex].layers}
              onToggle={handleLayerToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
