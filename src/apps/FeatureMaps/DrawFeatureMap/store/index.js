import { create } from "zustand";
//import { devtools, persist, createJSONStorage } from "zustand/middleware";
import initialMapState from "./initialMapState";
import setDrawData from "./setDrawData";
import setAnnotationColor from "./setAnnotationColor";
import setAnnotationsLabels from "./setAnnotationsLabels";
import setFeatureMapData from "./setFeatureMapData";
import setScaleBarRight from "./setScaleBarRight";
import getters from "./getters";
import setters from "./setters";

export const useStore = create((set) => ({
  //values
  ...initialMapState,
  //getters
  ...getters,
  //setters
  setFeatureMapData: (newFeatureMapData) =>
    set((state) => (setFeatureMapData(state, newFeatureMapData))),
  setMenuView: () =>
    set((state) => setters.setMenuOpen(state)),
  setDocumentScaleBarWidth : (width) =>
    set((state) => setters.setDocumentScaleBarWidth(state, width)),
  setDocumentFocusBarRight : (endPosition) =>
    set((state) => setters.setDocumentFocusBarRight(state, endPosition)),
  setFragmentFocusPositions: (start, end) =>
    set((state) => setters.setFragmentFocusPositions(state, start, end)),
  setAnnotationColor: (label, color) =>
    set((state) => setAnnotationColor(state, label, color)),
  setAnnotationsLabels: (labels, columnSelect) =>
    set((state) => setAnnotationsLabels(state, labels, columnSelect)),
  setDrawData: (newDrawData) => set((state) => setDrawData(state, newDrawData)),

  setScaleBarRight: (right) => set((state) => setScaleBarRight(state, right)),

}));
