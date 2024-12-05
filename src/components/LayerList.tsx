import React from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';

interface LayerListProps {
  layers: Array<{
    name: string;
    enabled: boolean;
    index: number;
  }>;
  onToggle: (index: number) => void;
}

export function LayerList({ layers, onToggle }: LayerListProps) {
  return (
    <div className="h-full">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Animation Layers</h3>
        </div>
      </div>
      <div className="divide-y">
        {layers.map((layer) => (
          <div
            key={layer.index}
            className="p-4 flex items-center justify-between hover:bg-gray-100"
          >
            <span className="text-sm truncate flex-1">{layer.name}</span>
            <button
              onClick={() => onToggle(layer.index)}
              className={`p-1.5 rounded-full ${
                layer.enabled
                  ? 'text-blue-500 hover:bg-blue-50'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              {layer.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}