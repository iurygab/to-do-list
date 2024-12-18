const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar o CORS
const tasksRoutes = require('./routes/task');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Ativar o CORS

// Rotas
app.use('/api', tasksRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
