const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose()


const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

let db = new sqlite3.Database('./compras.db',(err)=>{
    if(err){
        console.log(error.message)
    }
    console.log('connected to database')
});

let sql = 'SELECT * FROM compras';

let somaPrecos = 0;

db.all(sql, [], (err, rows) => {
    if(err){
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
        somaPrecos = somaPrecos + row['preco'];
    });
    console.log(somaPrecos);
});

app.get("/", (req, res) => {
    res.send(`${somaPrecos}`);
});

db.close((err) => {
    if(err){
        throw err;
    }
    console.log('connection closed');
});
