
import express from 'express';
import 'dotenv/config';

import { fetchAllBodies, fetchPlanetData } from "./controllers"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/api/planets', async (_req, res) => {
    const data = await fetchAllBodies();
    res.status(200).json(data);
})

app.get('/api/planet/:id', async (req, res) => {
    const data = await fetchPlanetData(req.params.id);
    res.status(200).json(data);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});