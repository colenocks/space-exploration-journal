
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

import { fetchAllBodies, fetchPlanetData, fetchAPOD } from "./controllers"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT = process.env.PORT || 5000;

app.get('/api/planets', async (_req: Request, res: Response) => {
    const data = await fetchAllBodies();
    res.status(200).json(data);
})

app.get('/api/planets/:id', async (req: Request, res: Response) => {
    const data = await fetchPlanetData(req.params.id);
    res.status(200).json(data);
})

app.get('/api/apod/:count', async (req: Request, res: Response) => {
    const data = await fetchAPOD(Number(req.params.count));
    res.status(200).json(data);
})

// Serve static files from the public directory (built by Vite)
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;