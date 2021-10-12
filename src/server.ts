import express from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import ormconfig from './ormconfig';
import cors from 'cors';

const app = express();
app.use(cors())

createConnection(
    ormconfig as ConnectionOptions
).then(() => {
    console.log(`connected to database ${process.env.DB_NAME}`)
    const path = __dirname + '/build'
    app.use(express.static(path));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // app.get('/api/random', )
    app.get('/', function (req,res) {
        res.sendFile(path + "index.html");
      });

    // api/user endpoint
    app.use('/api/users', require('./routes/users'));

    // api/quote endpoint
    app.use('/api/quotes', require('./routes/quotes'));

    const port = 4000;
    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    })
})
