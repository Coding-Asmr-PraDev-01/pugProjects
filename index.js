import express from 'express';
import pug from 'pug';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");

app.use(express.static(path.join(__dirname + "/public")))

app.get('/', (req, res) => {
     res.render('main');
});
app.listen(3000);
