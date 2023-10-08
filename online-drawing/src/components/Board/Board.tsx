import React, { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MenuState } from "@/interfaces";

const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shouldDraw = useRef(false);
    const activeMenuItem = useSelector(
        (state: MenuState) => state.menu.activeMenuItem
    );
    const { color, size } = useSelector(
        (state: any) => state.toolbox[activeMenuItem]
    );

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x: number, y: number) => {
            context?.beginPath();
            context?.moveTo(x, y);
        };

        const drawLine = (x: number, y: number) => {
            context?.lineTo(x, y);
            context?.stroke();
        };

        const handleMouseDown = (e: MouseEvent) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!shouldDraw.current) return;

            drawLine(e.clientX, e.clientY);
        };
        const handleMouseUp = () => {
            shouldDraw.current = false;
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const context = canvasRef.current.getContext("2d");

        const changeConfig = () => {
            if (context) {
                context.strokeStyle = color;
                context.lineWidth = size;
            }
        };

        changeConfig();
    }, [color, size]);

    return <canvas ref={canvasRef}></canvas>;
};

export default memo(Board);
