import create from "zustand";

const useStore = create((set) => ({
  data: [],
  setData: (e) => set((state) => ({ data: e })),
}));

//Liked Tracks

export const usedata = create((set) => ({
  data: [],
  setData: (e) => set((state) => ({ data: [e, ...state.data] })),
  removeData: (e) =>
    set((state) => ({ data: state.data.filter((item) => item.key !== e) })),
}));

//Saved Tracks

export const savedData = create((set) => ({
  data: [],
  setData: (e) => set((state) => ({ data: [e, ...state.data] })),
  removeData: (e) =>
    set((state) => ({ data: state.data.filter((item) => item.key !== e) })),
}));

//playing

export const currentlyPlaying = create((set) => ({
  data: [1],
  setData: (e) => set((state) => ({ data: e })),
}));

// Name
export const name = create((set) => ({
  data: { firstName: "Name" },
  setData: (e) => set((state) => ({ data: e })),
}));

export default useStore;

// const GetData = () => {
//     const data = useStore((state) => state.data);
//     console.log(data);
//   };
