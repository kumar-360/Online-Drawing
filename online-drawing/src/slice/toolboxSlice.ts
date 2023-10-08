import { COLORS, MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3,
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3,
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
};

export const toolboxSlice = createSlice({
    name: "toolbox",
    initialState: INITIAL_STATE,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size;
        },
    },
});

export const { changeColor, changeBrushSize } = toolboxSlice.actions;
export default toolboxSlice.reducer;