const express = require('express');
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_BOOKS_QUERY = "SELECT * FROM Books"
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test",
    database: "react_sql"
});

connection.connect(err => {
    if (err) {
    console.log(err);
    } else {
    console.log('Connected to the MySQL server');
    }
    });
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello!");
});
app.get("/Books", (req,res) =>{
    connection.query(SELECT_ALL_BOOKS_QUERY, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            console.log(res);
            return res.json({
                data: results
            })
        }
    })
})

app.get('/Books/add', (req, res) => {
    const{tittle, genre1, genre2, genre3, price} = req.query;
    var aux1, aux2, aux3 = null;

    if (genre1 !== undefined){
        aux1 = "'" + genre1 + "'";
    }else {
        aux1 = null
    }
    if (genre2 !== undefined){
        aux2 = "'" + genre2 + "'";
    } else {
        aux2 = null
    }
    if (genre3 !== undefined){
        aux3 = "'" + genre3 + "'";
    } else {
        aux3 = null;
    }
    const INSERT_NEW_BOOK_QUERY = `INSERT INTO react_sql.Books (tittle, genre1, genre2, genre3, price) VALUES('${tittle}', `+aux1+`, `+aux2+`, `+aux3+`, 11)`
    console.log(INSERT_NEW_BOOK_QUERY)
    connection.query(INSERT_NEW_BOOK_QUERY, (err, results) =>{
        if(err){
            return res.send(err)
        } else {
            return res.send("Successfully added Book")
        }
    })
})
app.get('/Books/delete', (req, res) => {
    const{id} = req.query;
    const DELETE_BOOK_QUERY = `DELETE FROM react_sql.Books WHERE idBooks = ${id}`
    connection.query(DELETE_BOOK_QUERY, (err, results) =>{
        if(err){
            return res.send(err)
        } else {
            return res.send("Successfully deleted Book")
        }
    })
})

app.get('/Books/deleteAll', (req, res) => {
    const DELETE_BOOK_QUERY = `TRUNCATE TABLE react_sql.Books`
    connection.query(DELETE_BOOK_QUERY, (err, results) =>{
        if(err){
            return res.send(err)
        } else {
            return res.send("Successfully deleted all Book")
        }
    })
})

app.get('/Books/update', (req, res) => {
    const{id, tittle, genre1, genre2, genre3, price} = req.query;
    var aux1, aux2, aux3 = null;

    if (genre1 !== undefined){
        aux1 = "'" + genre1 + "'";
    }else {
        aux1 = null
    }
    if (genre2 !== undefined){
        aux2 = "'" + genre2 + "'";
    } else {
        aux2 = null
    }
    if (genre3 !== undefined){
        aux3 = "'" + genre3 + "'";
    } else {
        aux3 = null;
    }
    const UPDATE_BOOK_QUERY = `UPDATE react_sql.Books
    SET tittle = '${tittle}', price = '${price}', genre1= `+aux1+`, genre2= `+aux2+`, genre3= `+aux3+` WHERE idBooks = ${id}`;
    connection.query(UPDATE_BOOK_QUERY, (err, results) =>{
        if(err){
            return res.send(err)
        } else {
            return res.send("Successfully updated Book")
        }
    })
})

app.listen(4000, () => {
    console.log("Books server listening on port 4000")
});