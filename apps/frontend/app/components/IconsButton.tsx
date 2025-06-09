import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`m-1 pointer rounded-full border p-2 bg-black hover:bg-gray-600 ${activated ? "text-red-500" : "text-white"} `} onClick={onClick}>
        {icon}
    </div>
}