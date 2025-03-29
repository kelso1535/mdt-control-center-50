
// Type definitions for FiveM NUI environment
interface Window {
  invokeNative?: (action: string, data?: any) => void;
  GetParentResourceName?: () => string;
}
