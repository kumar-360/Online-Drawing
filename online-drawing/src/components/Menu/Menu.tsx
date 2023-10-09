import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    faPencil,
    faEraser,
    faRotateLeft,
    faRotateRight,
    faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Icon, IconContainer, MenuContainer } from "./Menu.style";
import { MENU_ITEMS } from "@/constants";
import { actionItemClick, menuItemClick } from "@/slice/menuSlice";
import { MenuState } from "@/interfaces";
import { socket } from "@/socket";

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector(
        (state: MenuState) => state.menu.activeMenuItem
    );
    const { color, size } = useSelector(
        (state: any) => state.toolbox[activeMenuItem]
    );

    const handleMenuItemClick = useCallback(
        (itemName: string) => {
            dispatch(menuItemClick(itemName));

            socket.emit("changeConfig", {
                activeMenuItem: itemName,
                color,
                size,
            });
        },
        [dispatch, color, size]
    );

    const handleActionItemClick = useCallback(
        (itemName: string) => {
            dispatch(actionItemClick(itemName));
        },
        [dispatch]
    );

    return (
        <MenuContainer>
            <IconContainer
                active={activeMenuItem === MENU_ITEMS.PENCIL}
                onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}
            >
                <Icon icon={faPencil} />
            </IconContainer>

            <IconContainer
                active={activeMenuItem === MENU_ITEMS.ERASER}
                onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}
            >
                <Icon icon={faEraser} />
            </IconContainer>

            <IconContainer
                active={activeMenuItem === MENU_ITEMS.UNDO}
                onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
            >
                <Icon icon={faRotateLeft} />
            </IconContainer>

            <IconContainer
                active={activeMenuItem === MENU_ITEMS.REDO}
                onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
            >
                <Icon icon={faRotateRight} />
            </IconContainer>

            <IconContainer
                active={activeMenuItem === MENU_ITEMS.DOWNLOAD}
                onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
            >
                <Icon icon={faFileArrowDown} />
            </IconContainer>
        </MenuContainer>
    );
};

export default memo(Menu);
