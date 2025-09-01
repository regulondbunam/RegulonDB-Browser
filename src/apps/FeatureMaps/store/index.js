import { create } from "zustand";
import {featureMapDataTemplate} from "../model/featureMapDataTemplate";
import changeTitle from "./changeTitle";
import setRawData from "./setRawData";

export const useStore = create((set) => ({
    ...featureMapDataTemplate,
    setTitle: (newTitle)=>set((state) => changeTitle(state, newTitle)),
    setRawData: (newRawData)=>set((state) => setRawData(state, newRawData)),
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));