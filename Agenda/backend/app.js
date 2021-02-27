const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.route('/contatos')
    .delete(api.deleteContato())
    .put(api.updateContato())
    .get(api.getContatos())
    .post(api.setContato());

app.listen(8080, () => console.log('Servidor iniciado!'));