import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconsButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "../draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "none";

export function CanvasComponent({
    roomId,
    socket
}: {
    socket: WebSocket
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>()
    const [selectedTool, setSelectedTool] = useState<Tool>("none");

//     if (selectedTool === "none") {
//     alert("Please select a tool before drawing!");
//     return;
// }
    useEffect(() => {
        game?.setTool(selectedTool)
    }, [selectedTool])
    
    
    useEffect(() => {
        if(canvasRef.current){
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
            g.destroy()
        }
        }
    }, [canvasRef]);

    return <div style={{  // Prevents scrolling 
        height: "100vh",
        overflow: "hidden"
    }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}  />
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
    
} 

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="flex gap-2 text-white">
            <IconButton onClick={() => {
                setSelectedTool("pencil")
            }} activated={selectedTool === "pencil"} icon={<Pencil />} ></IconButton>

            <IconButton onClick={() => {
                setSelectedTool("rect")
            }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} ></IconButton>

            <IconButton onClick={() => {
                setSelectedTool("circle")
            }} activated={selectedTool === "circle"} icon={<Circle />} ></IconButton>
            </div>
            
        </div>
}