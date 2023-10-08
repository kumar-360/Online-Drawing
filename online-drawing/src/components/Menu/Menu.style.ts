import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IStyles {
    active: boolean;
}

export const MenuContainer = styled.div(({ theme }) => ({
    display: "flex",
    position: "absolute",
    padding: "4px 20px",
    justifyContent: "space-between",
    width: "25%",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "6px",
    border: `1px solid ${theme.colors.borderPrimary}`,
    boxShadow: theme.colors.shadowPrimary,
    backgroundColor: theme.colors.backgroundPrimary,
}));

export const IconContainer = styled.div<IStyles>(({ theme, active }) => {
    return {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
        width: "40px",
        borderRadius: "6px",
        backgroundColor: active ? theme.colors.textSecondary : undefined,

        "&:hover": {
            backgroundColor: theme.colors.textSecondary,
        },
    };
});

export const Icon = styled(FontAwesomeIcon)(({ theme }) => {
    return {
        color: theme.colors.textPrimary,
        fontSize: "20px",
    };
});
