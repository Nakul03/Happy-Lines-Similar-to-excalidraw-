import { WebSocketServer } from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({port : 8080});

wss.on('connection', function connection(ws, request){
    const Url = request.url;
    if(!Url) {
        return;
    }
    const queryParams = new URLSearchParams(Url.split('?')[1]);
    const token = queryParams.get('token');
    const decoded = jwt.verify(token as string, JWT_SECRET)

    if(!decoded || !(decoded as JwtPayload).userId) {
        ws.close();
        return;
    }

    ws.on('message', function message(data){
        ws.send('Connected to ws, data send successfully')
    });
})