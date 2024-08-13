import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import { appConfig } from './config/app.config.js';
import { router } from './router/router.js';


const app = express();

//Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/blacklisted", )


app.listen(appConfig.port, appConfig.host, () => {
    console.log(`${appConfig.port} - port ishlamoqda.....`)
})