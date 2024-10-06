
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the server!' });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});