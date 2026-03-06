import { create } from 'zustand';

export type Point = [number, number, number]; // [x, y, pressure]
export type Line = { points: Point[]; color: string };

export interface DrawingState {
  //states
  lines: Line[];
  currentLine: Point[] | null;
  strokeColor: string;

  // Actions
  setStrokeColor: (color: string) => void;
  startLine: (point: Point) => void;
  addPointToCurrentLine: (point: Point) => void;
  finishLine: () => void;
  undo: () => void;
  clearCanvas: () => void;
}

export const useDrawingStore = create<DrawingState>((set) => ({
  lines: [],
  currentLine: null,
  strokeColor: '#1e1e1e',

  setStrokeColor: (color) => set({ strokeColor: color }),

  startLine: (point) => set({ currentLine: [point] }),

  addPointToCurrentLine: (point) =>
    set((state) => {
      if (!state.currentLine) return state;
      return { currentLine: [...state.currentLine, point] };
    }),

  finishLine: () =>
    set((state) => {
      if (!state.currentLine) return state;
      return {
        lines: [
          ...state.lines,
          { points: state.currentLine, color: state.strokeColor },
        ],
        currentLine: null,
      };
    }),

  undo: () =>
    set((state) => ({
      lines: state.lines.slice(0, -1),
      currentLine: null,
    })),

  clearCanvas: () => set({ lines: [], currentLine: null }),
}));
