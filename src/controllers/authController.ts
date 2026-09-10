import {User} from "../models/user.ts";
import {bcrypt} from "bcrypt";

interface SignUpRequestBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const signUp = async (req: Request, res: Response) => {
    const body: SignUpRequestBody = await req.json();
    try{
        if(!body.username || !body.email || !body.password || !body.confirmPassword) {
            return res.status(400).send().json({ message: 'All fields are required' });
        }
        
        if(body.password !== body.confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if(body.password === body.confirmPassword) {
            const hashedPassword = await bcrypt.hashSync(body.password,10);
        }

        // const { username , email , password }: SignUpRequestBody = req.body;
        
        const newUser = await User.create({
            // body.username,
            // body.email,
            // hashedPassword: body.password // In a real application, you should hash the password before storing it
        });
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    }catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}