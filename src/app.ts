import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import sequelize from "./config/database.ts";
import { User } from "./models/user.ts";
import Account from "./models/account.ts";

const app = express();
const port = 3000;

// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

await sequelize.sync({ alter: true });
console.log('All models were synchronized successfully.');


async function authenticateDatabase(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

authenticateDatabase();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});