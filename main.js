const http = require('http');
const url = require('url');
const fs= require('fs');
const querystring = require('querystring');


const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "omkumar1",
    port : 3306,
    database : "sample"
})
db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("db connected")
     }
})

const server = http.createServer((req, res) => {
    const urlparse = url.parse(req.url, true);
    
   

        

  if(urlparse.pathname == '/users' && req.method == 'GET')
  {

    let query = "select * from datas;"
        db.query(query,(req, data)=>{
            res.writeHead( 200 , { 'content-type' : "application/json"})
            res.end(JSON.stringify(data));
        })
        console.log()
  }
  else if(urlparse.pathname == '/add' && req.method == 'POST')
  {  
   req.on("data",(data)=>{
     var reqbody = JSON.parse(data);
  
    db.query("INSERT INTO datas (name,age) values ('"  +  reqbody.name +"'," +  reqbody.age + ")", function(err, result){
                if(err) throw err;
                res.writeHead( 200 , { 'content-type' : "text/plain"})
                res.end("1 record inserted");
                console.log("1 record inserted");
            });
    
        })   
        
  }
  else if(urlparse.pathname == '/edit' && req.method == 'PUT')
  {
    req.on("data",(data)=>{
        var reqbody = JSON.parse(data);
  
    db.query("UPDATE datas SET name ='"+ reqbody.name + "', age= "+reqbody.age +" WHERE id = "+ reqbody.id, function(err, result){
                if(err) throw err;
                res.writeHead( 200 , { 'content-type' : "text/plain"})
                res.end("1 record updated");
                console.log("1 record updated");
            });
    })
        }
        
  else if(urlparse.pathname == `/del` && req.method == 'DELETE')
  { req.on("data",(data)=>{
    var reqbody = JSON.parse(data);
  
    db.query(`DELETE FROM datas WHERE id=${reqbody.id};`, function(err, result){
                if(err) throw err;
                res.writeHead( 200 , { 'content-type' : "text/plain"})
                res.end("1 record deleted");
                console.log("1 record deleted");
            });
  })
  }
  
 
});

server.listen(8080 , (err)=>{
    if(err){
        console.log("error")
    }
    else{ console.log(`server started `)}
})


