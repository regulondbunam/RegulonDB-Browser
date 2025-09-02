import { create } from "zustand";
import initialMapState from "./initialMapState";
import setScale from "./setScale";


export const useStore = create((set) => ({
  ...initialMapState,
  setFeatureMapData: (newFeatureMapData) => set((state) => ({ ...state, featureMapData: newFeatureMapData })),
  setScale: (newScale) => set((state) => setScale(state, newScale)),
  setMenuView: ()=>set((state)=>({...state, isMenuOpen:!state.isMenuOpen}))
}));