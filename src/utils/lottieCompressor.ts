interface CompressorOptions {
  precision: number;
  keepMeta: boolean;
  keepNm: boolean;
  keepMn: boolean;
}

export function trimDecimalPrecision(obj: any, options: CompressorOptions): any {
  if (typeof obj === "number" && !Number.isInteger(obj)) {
    return parseFloat(obj.toFixed(options.precision));
  } else if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map((item) => trimDecimalPrecision(item, options));
    } else {
      const result: Record<string, any> = {};
      for (const key in obj) {
        if (!options.keepMeta && key === "meta") {
          continue;
        }
        if (!options.keepNm && key === "nm" && typeof obj[key] === "string") {
          continue;
        }
        if (!options.keepMn && key === "mn" && typeof obj[key] === "string") {
          continue;
        }
        if (key === "s") {
          const value = obj[key];
          if (Array.isArray(value) && value.length === 4 && value.every((v) => v <= 1)) {
            result[key] = trimDecimalPrecision(obj[key], { ...options, precision: 5 });
            continue;
          }
        }
        if (obj.hasOwnProperty(key)) {
          result[key] = trimDecimalPrecision(obj[key], options);
        }
      }
      return result;
    }
  }
  return obj;
}

export function compressLottie(json: any, options: CompressorOptions): any {
  if (!json) return null;
  return trimDecimalPrecision(json, options);
}

export function calculateCompressionRate(originalSize: number, compressedSize: number): number {
  if (!originalSize || !compressedSize || originalSize <= 0) return 0;
  const rate = ((originalSize - compressedSize) / originalSize) * 100;
  return Math.max(0, Math.min(100, rate)); // Ensure rate is between 0 and 100
}