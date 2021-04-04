const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const apiUser = require('./api/user');
const apiTask = require('./api/tasks');
const validationToken = require('./middlewares/validationToken');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/users/register')
    .post(apiUser.registerUser());

app.route('/users/login')
    .post(apiUser.loginUser());

app.route('/logged')
    .post(validationToken, apiUser.isLoggedUser());

app.route('/task')
    .put(validationToken, apiTask.updateTask())
    .delete(validationToken, apiTask.deleteTask())
    .get(validationToken, apiTask.getTasks())
    .post(validationToken, apiTask.newTask());

app.listen(PORT, () => console.log('Server runing in port '+PORT));