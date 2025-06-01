import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { userMiddleware } from "./middleware";
import { SigninSchema, CreateUserSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";


const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    prismaClient.user.create

    res.json({
        message: "Signing up sucessfull"
    })
});

app.post("/signin", (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token,
        message: "You are signed in"
    })
});

app.get("/room", userMiddleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    res.json({
        roomId: "123" 
    })
});

if(app.listen(3001)){
    console.log("Listening on port 3001")
} else {
    console.log("Http connection failed")
}
