import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuState } from "@/interfaces";
import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";

const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shouldDraw = useRef(false);
    const drawHistory = useRef<ImageData[] | undefined>([]);
    const historyPointer = useRef(0);
    const dispatch = useDispatch();
    const { activeMenuItem, actionMenuItem } = useSelector(
        (state: MenuState) => state.menu
    );
    const { color, size } = useSelector(
        (state: any) => state.toolbox[activeMenuItem]
    );

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();

            const anchor = document.createElement("a");
            anchor.href = URL;
            anchor.download = "online-draw.jpg";
            anchor.click();
        } else if (actionMenuItem === MENU_ITEMS.UNDO) {
            if (historyPointer.current > 0) historyPointer.current--;

            const imageData = drawHistory?.current?.[historyPointer.current];
            context?.putImageData(imageData as ImageData, 0, 0);
        } else if (actionMenuItem === MENU_ITEMS.REDO) {
            if (
                historyPointer.current <
                (drawHistory?.current?.length as number) - 1
            )
                historyPointer.current++;

            const imageData = drawHistory?.current?.[historyPointer.current];
            context?.putImageData(imageData as ImageData, 0, 0);
        }

        dispatch(actionItemClick(null));
    }, [actionMenuItem, dispatch]);

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
            if (e.button !== 0) return;

            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!shouldDraw.current) return;

            drawLine(e.clientX, e.clientY);
        };
        const handleMouseUp = (e: MouseEvent) => {
            if (e.button !== 0 || e.button !== 0) return;

            shouldDraw.current = false;

            const imageData = context?.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            drawHistory?.current?.push(imageData as ImageData);
            historyPointer.current =
                (drawHistory?.current?.length as number) - 1;
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
