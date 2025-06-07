"use client"
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";
import { CanvasComponent } from "./Canvas";

export function RoomCanvas({ roomId }: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket |null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZDljNzVmZC1lZTg0LTRkMDQtYWI3ZC0xNGY5NGU3NDFjNzEiLCJpYXQiOjE3NDkzMjM0NzN9.1WLNN6ghll5gMZjE6jDKiNki4JzN6FjY_qTmgA26E6k`);

        ws.onopen = () => {
            setSocket(ws);

            const data = JSON.stringify({
                type: "join_room",
                roomId
            })

            ws.send(data)
        }
    }, [])


    if(!socket) {
        return <div>
            Connecting to server....
        </div>
    }

    return <div>
        <CanvasComponent roomId = {roomId} socket={socket} />
            
        <div className="absolute bottom-4 right-4 space-y-2">
                <button className="bg-white text-black m-2 px-4 py-2 rounded shadow">Rectangle</button>
                <button className="bg-white text-black px-4 py-2 rounded shadow">Circle</button>
            </div>
    </div>
}