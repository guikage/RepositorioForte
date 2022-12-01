const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose()
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

let db = new sqlite3.Database('./compras.db',(err)=>{
    if(err){
        console.log(error.message)
    }
    console.log('connected to database')
});

let sql = "SELECT * FROM compras";
let soma = "SELECT FORMAT(SUM(preco), 2) AS 'total' FROM compras";

let somaPrecos = 0;


app.get("/items", (req, res) => {
    db.all(sql, [], (err, rows) => {
        if(err){
            throw err;
        } else {
            res.send(rows);
        }
    });
});

app.get("/sum", (req, res) => {
    db.all(soma, (err, somaprecos) => {
        if(err){
            throw err;
        } else {
            res.send(somaprecos);
        }
    });
});
