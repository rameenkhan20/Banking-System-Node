import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});