import cors from 'cors';
import express from 'express';
import clientRoutes from './routes/clientRoute.js';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
	origin: '*',
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

app.use('/api', clientRoutes);

app.listen(port, () => {
	console.log('listening to port', port);
});
