import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import initialMapState from "./initialMapState";
import setScale from "./setScale";
import setDrawData from "./setDrawData";
import setAnnotationColor from "./setAnnotationColor";
import setAnnotationsLabels from "./setAnnotationsLabels";

export const useStore = create((set) => ({
  ...initialMapState,
  setFeatureMapData: (newFeatureMapData) =>
    set((state) => ({ ...state, featureMapData: newFeatureMapData })),
  setScale: (newScale) => set((state) => setScale(state, newScale)),
  setMenuView: () =>
    set((state) => ({ ...state, isMenuOpen: !state.isMenuOpen })),
  setAnnotationColor: (label, color) =>
    set((state) => setAnnotationColor(state, label, color)),
  setAnnotationsLabels: (labels, columnSelect) =>
    set((state) => setAnnotationsLabels(state, labels, columnSelect)),
  setDrawData: (newDrawData) => set((state) => setDrawData(state, newDrawData)),
}));
