import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZWI5OGZkMC1hYThhLTQ1ZTctYmUxNC0xZGEzNjVmMzMyNzAiLCJpYXQiOjE3NDg4ODI3NTB9.mvYMNGCin369V4zafQhsZASoUqwKykTyJG8lnx1m_Rw`);
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