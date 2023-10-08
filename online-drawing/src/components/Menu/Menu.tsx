import React, { memo } from "react";
import {
    faPencil,
    faEraser,
    faRotateLeft,
    faRotateRight,
    faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Icon, IconContainer, MenuContainer } from "./Menu.style";

const Menu = () => {
    return (
        <MenuContainer>
            <IconContainer active={false}>
                <Icon icon={faPencil} />
            </IconContainer>

            <IconContainer active={false}>
                <Icon icon={faEraser} />
            </IconContainer>

            <IconContainer active={false}>
                <Icon icon={faRotateLeft} />
            </IconContainer>

            <IconContainer active={false}>
                <Icon icon={faRotateRight} />
            </IconContainer>

            <IconContainer active={false}>
                <Icon icon={faFileArrowDown} />
            </IconContainer>
        </MenuContainer>
    );
};

export default memo(Menu);
