import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

import logger from './Middleware/Logger.js';
import sequelize from './models/db.js';


import auth from './routes/auth.js';
import menu from './routes/menu.js';
import orders from './routes/orders.js';
import users from './routes/users.js';

const PORT = process.env.PORT || 8080;

const app = express();
sequelize.sync();

const swaggerDoc = YAML.load('./utities/swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(cors());

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