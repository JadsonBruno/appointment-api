import 'reflect-metadata';
import express, { json } from 'express';
import routes from './routes/index';
import uploadConfig from './config/upload';
import './database/index';

const app = express();

app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Server started on port 3333');
});
