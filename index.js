import app from './src/app.js';
import { PORT } from './src/config.js';

app.listen(PORT);
console.log(`Server runnin on port ${PORT}`)