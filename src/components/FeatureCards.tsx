import React from "react";
import { Zap, FileJson, Download, Lock, EyeOff, Sliders } from "lucide-react";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8 my-16 px-8">
      <FeatureCard
        icon={<FileJson className="w-8 h-8" />}
        title="Smart Compression"
        description="Intelligent algorithms to reduce file size while preserving animation quality"
      />
      <FeatureCard
        icon={<Zap className="w-8 h-8" />}
        title="Real-time Preview"
        description="See your compressed animations side by side with the original"
      />
      <FeatureCard
        icon={<Download className="w-8 h-8" />}
        title="Batch Processing"
        description="Upload and compress multiple Lottie files at once"
      />
      <FeatureCard
        icon={<Lock className="w-8 h-8" />}
        title="Local Processing"
        description="All processing is done locally in your browser, ensuring data security and privacy"
      />
      <FeatureCard
        icon={<EyeOff className="w-8 h-8" />}
        title="Layer Management"
        description="Support for disabling specific layers and removing watermark layers"
      />
      <FeatureCard
        icon={<Sliders className="w-8 h-8" />}
        title="Adjustable Compression"
        description="Fine-tune compression settings and see the results in real-time"
      />
    </div>
  );
}
