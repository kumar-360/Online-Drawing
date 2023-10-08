import React, { memo, useCallback } from "react";
import {
    ColorBox,
    Heading,
    ItemContainer,
    ToolItem,
    ToolboxContainer,
} from "./Toolbox.style";
import { COLORS } from "@/constants";

const Toolbox = () => {
    const updateBrushSize = useCallback((e) => {}, []);

    return (
        <ToolboxContainer>
            <ToolItem>
                <Heading>Stroke Color</Heading>
                <ItemContainer>
                    <ColorBox color={COLORS.BLACK} active={false} />
                    <ColorBox color={COLORS.RED} active={false} />
                    <ColorBox color={COLORS.GREEN} active={false} />
                    <ColorBox color={COLORS.BLUE} active={false} />
                    <ColorBox color={COLORS.ORANGE} active={false} />
                    <ColorBox color={COLORS.YELLOW} active={false} />
                </ItemContainer>
            </ToolItem>

            <ToolItem>
                <Heading>Brush Size</Heading>
                <ItemContainer>
                    <input
                        type="range"
                        min={1}
                        max={10}
                        onChange={updateBrushSize}
                    />
                </ItemContainer>
            </ToolItem>
        </ToolboxContainer>
    );
};

export default memo(Toolbox);
