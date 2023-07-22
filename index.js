
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
//const data = fetch('https://dummyjson.com/products');
//use promises for that
const products = data.products;
const express = require ('express')
const server = express();
//using middleware morgan
//const morgan = require('morgan');
//server.use(morgan ('default'));
//body parser
server.use(express.json());
server.use( (req,res,next)=>{
    console.log(req.method,req.ip,req.hostname);
    next();
})
   //middleware authorization
  // const auth = (req,res,next)=>{
    //console.log(req.query)
    //three forms of sending request
    //using body
    //using query
    //using params
    //if(req.body.password =='123'){
      //  next();
    //}
    //else{
      //  res.sendStatus(401);
    //}
//}
//server.use(auth);
//products

server.get('/products', (req,res)=>{
   // res.send('hiiii')
    res.json(products)
   
})
server.get('/products/:id',(req,res) =>{
    const id = +req.params.id;
    const product = products.find(p=>p.id===id)
    res.json(product);
});
server.post('/products', (req,res) =>{
    console.log(req.body);
    products.push(req.body);
    res.json(req.body);
});
server.get('/', (req,res)=>{
    res.json({type : 'GET'})
})
server.post('/', (req,res)=>{
    res.json({type : 'POST'})
})
server.delete('/', (req,res)=>{
    res.json({type : 'DELETE'})
})

   

server.listen(8080);