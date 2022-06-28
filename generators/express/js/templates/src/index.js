import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
