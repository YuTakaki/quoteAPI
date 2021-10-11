import express from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import ormconfig from './ormconfig';

const app = express();


createConnection(
    ormconfig as ConnectionOptions
).then(() => {
    console.log(`connected to database ${process.env.DB_NAME}`)
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    const port = 4000;
    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    })
})
