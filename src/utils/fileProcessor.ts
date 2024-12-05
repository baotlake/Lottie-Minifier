import { compressLottie } from './lottieCompressor';

interface Layer {
  name: string;
  enabled: boolean;
  index: number;
}

export async function processLottieFile(file: File) {
  try {
    const text = await file.text();
    const original = JSON.parse(text);
    
    if (!original || !original.layers) {
      throw new Error('Invalid Lottie JSON format');
    }

    // Extract layers from the Lottie JSON
    const layers = extractLayers(original);
    
    // Initial compression with default options
    const compressed = compressLottie(original, {
      precision: 3,
      keepMeta: false,
      keepNm: true,
      keepMn: false,
    });

    const originalSize = new Blob([text]).size;
    const compressedSize = compressed ? new Blob([JSON.stringify(compressed)]).size : originalSize;

    return {
      name: file.name,
      original,
      compressed,
      originalSize,
      compressedSize,
      layers,
    };
  } catch (error) {
    console.error('Error processing Lottie file:', error);
    throw new Error('Failed to process Lottie file. Please ensure it\'s a valid Lottie JSON.');
  }
}

function extractLayers(lottieJson: any): Layer[] {
  if (!Array.isArray(lottieJson.layers)) return [];
  
  return lottieJson.layers.map((layer: any, index: number) => ({
    name: layer.nm || `Layer ${index + 1}`,
    enabled: true,
    index,
  }));
}