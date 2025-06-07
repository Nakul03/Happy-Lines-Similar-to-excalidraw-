import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZDljNzVmZC1lZTg0LTRkMDQtYWI3ZC0xNGY5NGU3NDFjNzEiLCJpYXQiOjE3NDkzMjM0NzN9.1WLNN6ghll5gMZjE6jDKiNki4JzN6FjY_qTmgA26E6k`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}