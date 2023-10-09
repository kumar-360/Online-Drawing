import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ColorBox,
    Heading,
    ItemContainer,
    ToolItem,
    ToolboxContainer,
} from "./Toolbox.style";
import { BRUSH_SIZE, COLORS, MENU_ITEMS, STROKE_COLOR } from "@/constants";
import { MenuState } from "@/interfaces";
import { changeBrushSize, changeColor } from "@/slice/toolboxSlice";

const Toolbox = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector(
        (state: MenuState) => state.menu.activeMenuItem
    );

    const { color, size } = useSelector(
        (state: any) => state.toolbox[activeMenuItem]
    );

    const updateBrushSize = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                changeBrushSize({ item: activeMenuItem, size: e.target.value })
            );
        },
        [dispatch, activeMenuItem]
    );

    const updateColor = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(
                changeColor({
                    item: activeMenuItem,
                    color: (e.target as HTMLInputElement).getAttribute("color"),
                })
            );
        },
        [dispatch, activeMenuItem]
    );

    const showStrokeTooltipOption = useMemo(
        () => activeMenuItem === MENU_ITEMS.PENCIL,
        [activeMenuItem]
    );

    const showBrushTooltipOption = useMemo(
        () =>
            activeMenuItem === MENU_ITEMS.PENCIL ||
            activeMenuItem === MENU_ITEMS.ERASER,
        [activeMenuItem]
    );

    return (
        <ToolboxContainer>
            {showStrokeTooltipOption && (
                <ToolItem>
                    <Heading>{STROKE_COLOR}</Heading>
                    <ItemContainer onClick={updateColor}>
                        <ColorBox
                            color={COLORS.BLACK}
                            active={color === COLORS.BLACK}
                        />
                        <ColorBox
                            color={COLORS.RED}
                            active={color === COLORS.RED}
                        />
                        <ColorBox
                            color={COLORS.GREEN}
                            active={color === COLORS.GREEN}
                        />
                        <ColorBox
                            color={COLORS.BLUE}
                            active={color === COLORS.BLUE}
                        />
                        <ColorBox
                            color={COLORS.ORANGE}
                            active={color === COLORS.ORANGE}
                        />
                        <ColorBox
                            color={COLORS.YELLOW}
                            active={color === COLORS.YELLOW}
                        />
                    </ItemContainer>
                </ToolItem>
            )}

            {showBrushTooltipOption && (
                <ToolItem>
                    <Heading>{BRUSH_SIZE}</Heading>
                    <ItemContainer>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={size}
                            onChange={updateBrushSize}
                        />
                    </ItemContainer>
                </ToolItem>
            )}
        </ToolboxContainer>
    );
};

export default memo(Toolbox);
