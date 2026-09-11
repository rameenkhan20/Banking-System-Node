import {User} from "../models/user.ts";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from 'node:process';

interface SignUpRequestBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignInRequestBody {
    email: string;
    password: string;
}

export const signUp = async (req: Request, res: Response) => {
    try{
    const body: SignUpRequestBody = req.body;
    const { username, email, password, confirmPassword } = body;

    if(!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if(password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password,10);

    const newUser = await User.create({
        name: username,
        email: email,
        hashedPassword: hashedPassword,
        role: "user"
    });
    return res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const signIn = async (req: Request , res: Response) => {
    try{
        const {email,  password}: SignInRequestBody = req.body;

        const existingUserEmail = await User.findOne({
            where : {
                email: email
            }
        });
        
        const isMatch = bcrypt.compareSync(password, existingUserEmail?.getDataValue('hashedPassword') || "");

        if(!existingUserEmail || !isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                userId: existingUserEmail.getDataValue('id'),
                email: existingUserEmail.getDataValue('email'),
                role: existingUserEmail.getDataValue('role')
            },
            process.env.JWT_SECRET || "secretKey",
            { expiresIn: "1h" }
        )
        return res.status(200).json({message: "Signed In Successfully", token: token});

    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
