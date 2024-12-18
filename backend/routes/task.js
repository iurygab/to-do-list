const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.post('/pesquisar', (req, res) => {
    const query = 'SELECT * FROM task';
    db.all(query, [], (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
        } else {
            res.json(rows);
        }
    });
 });

 router.post('/tarefas', (req, res) => {
    const {titulo} = req.body;
    if (!titulo){
        return res.status(400).json({error: 'Título é obrigatorio.'});
    }

    const query = 'INSERT INTO task (titulo) VALUES (?)';
    db.run(query, [titulo], function (err) {
        if(err) {
            res.status(500).json({ error: err.message});
        } else {
            res.status(201).json({id: this.lastID, titulo });
        }
    });
});

router.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;

    if (!titulo) {
        console.error("Erro: Título é obrigatório.");
        return res.status(400).json({ error: 'Título é obrigatório.' });
    }

    const query = 'UPDATE task SET titulo = ? WHERE id = ?';
    db.run(query, [titulo, id], function (err) {
        if (err) {
            console.error("Erro ao editar a tarefa:", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            console.error("Erro: Tarefa não encontrada.");
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }

        res.json({ id: Number(id), titulo });
    });
});

// Rota para remover uma tarefa
router.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM task WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            console.error("Erro ao deletar a tarefa:", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            console.error("Erro: Tarefa não encontrada.");
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }

        res.status(204).send(); // No Content
    });
});


module.exports = router;

