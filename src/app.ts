import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
// import sequelize from "./config/database.ts";
import { signUp, signIn } from "./controllers/authController.ts";
// import { User } from "./models/user.ts";
import {sequelize} from "./models/index.ts"
import { accountModel } from "./models/account.ts";
// import { userModel} from "./models/user.ts";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync all models into PostgreSQL
    await sequelize.sync({ alter: true }); 
    console.log('All PostgreSQL tables created and relationships mapped successfully!');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
}


app.post("/user/signUp", signUp);
app.post("/user/signIn", signIn);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

startApp();
// authenticateDatabase();
// syncModels();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});