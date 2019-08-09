const express = require('express');
const body_parser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(body_parser.urlencoded({extended:true}));

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'login',
    port:'3307'
});

conexion.connect(err =>{
    if(err){
        return err;
    }else{
        console.log('Conectado a la bd');
    }
});

app.get('/usuario',(req,res,next) => {

    console.log(req.query);
    var usuario=req.query.username;
    var pass=req.query.password;
    conexion.query(`Select * from usuarios where username=? and password=?`,[usuario,pass],(err, row , field) => {
        if(err){

            console.log(err);
            return res.send(err)
        }
        if(row.length > 0){
            res.send({'sucess':true,'usuario': row[0].usuario});
        }else{
            res.send({'sucess':false,'message':usuario,pass});
        }
            
     });

});

app.get('/usua',(req,res,next) => {

    conexion.query(`Select * from usuarios`,(err, row ,) => {
        if(err){

            console.log(err);
            return res.send(err)
        }
        if(row.length > 0){
            res.send({'sucess':true,'usuario': row[0].usuario});
        }else{
            res.send({'sucess':false,'message':usuario,pass});
        }
            
     });

});

app.listen(4000, () =>{
    console.log('servidor corriendo en el puerto 4000');
});