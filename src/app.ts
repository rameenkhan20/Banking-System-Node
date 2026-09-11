import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import sequelize from "./config/database.ts";
import { User } from "./models/user.ts";
import {Account }from "./models/account.ts";
import {Transaction} from "./models/transaction.ts";
import { signUp, signIn } from "./controllers/authController.ts";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function syncModels(): Promise<void> {
    try {
        await sequelize.sync({ alter: true });
        console.log('Registered models:', (sequelize.models)); // 👈 add this
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Failed to sync models:', error);
    }
}

async function authenticateDatabase(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.post("/user/signUp", signUp);
app.post("/user/signIn", signIn);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

authenticateDatabase();
syncModels();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});