import styled from "styled-components";

interface IStyles {
    color: string;
    active: boolean;
}

export const ToolboxContainer = styled.div(({ theme }) => {
    return {
        padding: "20px",
        position: "absolute",
        top: "25%",
        left: "20px",
        width: "256px",
        borderRadius: "6px",
        border: `1px solid ${theme.colors.borderPrimary}`,
        boxShadow: `${theme.colors.shadowPrimary}`,
        backgroundColor: `${theme.colors.backgroundPrimary}`,

        "@media (max-width: 1050px)": {
            top: "120px",
            left: "50%",
            transform: "translateX(-50%)",
        },
    };
});

export const ToolItem = styled.div(() => {
    return {
        marginBottom: "20px",
    };
});

export const Heading = styled.h4(({ theme }) => {
    return {
        fontSize: "11px",
        color: `${theme.colors.textPrimary}`,
    };
});

export const ItemContainer = styled.div(() => {
    return {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "8px",
    };
});

export const ColorBox = styled.div<IStyles>(({ theme, color, active }) => {
    return {
        backgroundColor: color,
        height: "20px",
        width: "20px",
        marginRight: "4px",
        cursor: "pointer",
        borderRadius: "2px",
        border: active
            ? `1px solid ${theme.colors.borderSecondary}`
            : undefined,
        boxShadow: active ? theme.colors.shadowSecondary : undefined,

        "&:hover": {
            border: `1px solid ${theme.colors.borderSecondary}`,
            boxShadow: theme.colors.shadowSecondary,
        },
    };
});
