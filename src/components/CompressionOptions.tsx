import React from "react";
import { Settings, Layers, Save, Trash2, ArrowLeft } from "lucide-react";

interface CompressionOptionsProps {
  options: {
    precision: number;
    keepMeta: boolean;
    keepNm: boolean;
    keepMn: boolean;
  };
  onChange: (options: any) => void;
}

export function CompressionOptions({
  options,
  onChange,
}: CompressionOptionsProps) {
  return (
    <div className="flex items-center gap-6 px-4 h-14 border-b bg-white">
      <a href="/" className="flex items-center gap-3 w-64">
        <ArrowLeft />
        <span className="text-base font-medium">Lottie Minifier</span>
      </a>
      <div className="flex items-center gap-2 text-gray-700">
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium">Precision:</span>
        <input
          type="number"
          min="0"
          max="6"
          value={options.precision}
          onChange={(e) =>
            onChange({ ...options, precision: Number(e.target.value) })
          }
          className="w-16 px-2 py-1 border rounded text-sm"
        />
      </div>

      <div className="h-6 border-l border-gray-200" />

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={options.keepMeta}
            onChange={(e) =>
              onChange({ ...options, keepMeta: e.target.checked })
            }
            className="rounded text-blue-500 w-4 h-4"
          />
          <span className="text-sm">Metadata</span>
        </label>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={options.keepNm}
            onChange={(e) => onChange({ ...options, keepNm: e.target.checked })}
            className="rounded text-blue-500 w-4 h-4"
          />
          <span className="text-sm">Layer Names</span>
        </label>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={options.keepMn}
            onChange={(e) => onChange({ ...options, keepMn: e.target.checked })}
            className="rounded text-blue-500 w-4 h-4"
          />
          <span className="text-sm">Match Names</span>
        </label>
      </div>
    </div>
  );
}
