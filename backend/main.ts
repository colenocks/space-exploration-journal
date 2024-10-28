
import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

import { fetchAllBodies, fetchAPOD } from "./src/controller"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/api/planets', async (req: Request, res: Response) => {
    try {
        const data = await fetchAllBodies({ params: req.query });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching planets:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/api/apod', async (req: Request, res: Response) => {
    try {
        const data = await fetchAPOD({ params: req.query });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching APODS:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;