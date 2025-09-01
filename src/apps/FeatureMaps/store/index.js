import { create } from "zustand";
import { featureMapDataTemplate } from "../model/featureMapDataTemplate";
import changeTitle from "./changeTitle";
import setRawData from "./setRawData";
import setDrawOptions from "./setDrawOptions";
import setColorOptions from "./setColorOptions";
import setHandleAnnotation from "./setHandleAnnotation";

export const useStore = create((set) => ({
  ...featureMapDataTemplate,
  setTitle: (newTitle) => set((state) => changeTitle(state, newTitle)),
  setRawData: (newRawData) => set((state) => setRawData(state, newRawData)),
  setDrawOptions: (newDrawOptions) =>
    set((state) => setDrawOptions(state, newDrawOptions)),
  setColorOptions: (newColorOptions) =>
    set((state) => setColorOptions(state, newColorOptions)),
  setHandleAnnotation: (newHandleAnnotation) =>
    set((state) => setHandleAnnotation(state, newHandleAnnotation)),
}));
