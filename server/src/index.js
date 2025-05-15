import cors from 'cors';
import express from 'express';
import clientRoutes from './routes/clientRoute.js';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

app.use('/api', clientRoutes);

app.listen(port, () => {
	console.log('listening to port', port);
});
