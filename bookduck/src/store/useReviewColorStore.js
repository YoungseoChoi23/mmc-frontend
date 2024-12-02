import { create } from "zustand";

const useReviewColorStore = create((set) => ({
  reviewColor: "#ABABAB",
  setReviewColor: (newState) => set({ reviewColor: newState }),
}));

export default useReviewColorStore;
