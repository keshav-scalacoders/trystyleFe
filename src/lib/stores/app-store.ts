import { create } from 'zustand';
import type { Measurements, ClothingType } from '../../shared/schema';

interface AppStore {
  modelImage: File | null;
  modelPreviewUrl: string | null;
  measurements: Measurements | null;
  clothingImage: File | null;
  clothingPreviewUrl: string | null;
  clothingType: ClothingType | null;
  tryOnResultUrl: string | null;
  setModelImage: (file: File, previewUrl: string) => void;
  setMeasurements: (measurements: Measurements) => void;
  setClothingImage: (file: File, previewUrl: string, type: ClothingType) => void;
  setTryOnResult: (resultUrl: string) => void;
  resetClothing: () => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  modelImage: null,
  modelPreviewUrl: null,
  measurements: null,
  clothingImage: null,
  clothingPreviewUrl: null,
  clothingType: null,
  tryOnResultUrl: null,
  setModelImage: (file, previewUrl) => set({ modelImage: file, modelPreviewUrl: previewUrl }),
  setMeasurements: (measurements) => set({ measurements }),
  setClothingImage: (file, previewUrl, type) => 
    set({ clothingImage: file, clothingPreviewUrl: previewUrl, clothingType: type }),
  setTryOnResult: (resultUrl) => set({ tryOnResultUrl: resultUrl }),
  resetClothing: () => 
    set({ clothingImage: null, clothingPreviewUrl: null, clothingType: null, tryOnResultUrl: null }),
  reset: () => 
    set({
      modelImage: null,
      modelPreviewUrl: null,
      measurements: null,
      clothingImage: null,
      clothingPreviewUrl: null,
      clothingType: null,
      tryOnResultUrl: null,
    }),
}));
