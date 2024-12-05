import React, { useMemo } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { calculateCompressionRate } from "../utils/lottieCompressor";

interface LottiePreviewProps {
  original: any;
  compressed: any;
  originalSize: number;
  compressedSize: number;
}

export function LottiePreview({
  original,
  compressed,
  originalSize,
  compressedSize,
}: LottiePreviewProps) {
  const compressionRate = calculateCompressionRate(
    originalSize,
    compressedSize
  );
  const originalClone = useMemo(() => structuredClone(original), [original]);
  const compressedClone = useMemo(
    () => structuredClone(compressed),
    [compressed]
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Original</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Player
            autoplay
            loop
            src={originalClone}
            style={{ height: "200px" }}
          />
        </div>
        <div className="text-center text-sm text-gray-600">
          Size: {(originalSize / 1024).toFixed(2)} KB
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Compressed</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Player
            autoplay
            loop
            src={compressedClone}
            style={{ height: "200px" }}
          />
        </div>
        <div className="text-center text-sm text-gray-600">
          Size: {(compressedSize / 1024).toFixed(2)} KB
          <br />
          Compression: {compressionRate.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
