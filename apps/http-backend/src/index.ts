import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { userMiddleware } from "./middleware";
import { SigninSchema, CreateUserSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());
// app.use(cors());

app.post("/signup", async (req, res) => {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                username: parsedData.data.username,            //  data?
                password: parsedData.data.password,       // Hash the pass
                name: parsedData.data.name
            }
        })

        res.json({
            message: "Signing up sucessfull",
            userId: user.id
        })
    }catch(e){
        res.status(411).json({
            message: "User already exists with this username"
        })
    }   
});

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // compare hashed passwords
    const user = await prismaClient.user.findFirst({
        where: {
            username: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user){
        res.status(403).json({
            message: "Not authorized"
        });
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        message: "You are signed in",
        token
    })
});

app.get("/room", userMiddleware, async(req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        });
    }catch(e){
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }    
});

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId,
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        
        res.json({
            messages
        })
    }catch(e){
        res.json({
            messages:[]
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        },
    });
    
    res.json({
        room
    })
})

if(app.listen(3001)){
    console.log("Listening on port 3001")
} else {
    console.log("Http connection failed")
}
