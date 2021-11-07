import swaggerUi from 'swagger-ui-express';
import express from 'express';
import YAML from 'yamljs';
import cors from 'cors';

import logger from './Middleware/logger.js';


import orders from './routes/orders.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import menu from './routes/menu.js';

const PORT = process.env.PORT || 5000;

const app = express();

const swaggerDoc = YAML.load('./config/swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('fastfood API');
})
app.use('/uploads',express.static("uploads"));
app.use('/auth', auth);
app.use('/menu', menu);
app.use('/orders', orders);
app.use('/users', users);

app.use((req, res)=>{
    res.status(404).json({message: "route not located"});
    
});


app.listen(PORT, ()=>{
    logger.info(`backend running at http://localhost:${PORT}`);
})

export default app;