import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

app.get('/', (req, res) => {
	res.send('<h1>Hello Backend Test</h1>');
});

app.listen(port, () => {
	console.log('listening to port', port);
});
