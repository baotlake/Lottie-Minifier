export interface LottieData {
  name: string;
  original: any;
  compressed: any;
  originalSize: number;
  compressedSize: number;
  layers: Array<{ name: string; enabled: boolean; index: number }>;
}
