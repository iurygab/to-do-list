const sqlite3 = require('sqlite3'). verbose();

const db = new sqlite3.Database('./db/backed', (err) =>{
    if(err){
        console.log('Erro ao conectar ao banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            titulo TEXT NOT NULL
        
        )
        
    `);
});

module.exports = db;