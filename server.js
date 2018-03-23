var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
var path = require('path');
app.use(express.static(__dirname + '/AngularApp/dist'));

mongoose.connect('mongodb://localhost/products')
var Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema({
    title: {type: String, minlength:4},
    price: {type: Number, required: true },
    url: {type: String}
}, {timestamps: true});
mongoose.model("Product", ProductSchema);
var Product = mongoose.model("Product")

app.get('/api/products', (req,res) => {
    Product.find({}, (err,products) => {
        if(err){
            console.log(err);
        } else {
            res.json({products:products})
        }
    })
})
app.get('/api/products/:id', (req,res) => {
    console.log("We're in server")
    Product.findOne({_id: req.params.id}, (err,product) => {
        if(err){
            console.log(err);
        } else {
            res.json({products:product})
        }
    })
})

app.post('/api/products', (req,res) =>{
    console.log('we made it to server')
    var product = new Product (req.body);
    product.save((err,product) => {
        if (err){
            console.log(err)
        } else {
            console.log(product)
            res.json(product);
        }
    })

})
app.delete('/api/products/:id', (req,res) =>{
    Product.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        } else {
            res.json({message:"deleted"})
        }
    })
})

app.put('/api/products/:id', (req,res) => {
    console.log("hey man");
    console.log(req.params.id);
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id, {title:req.body.title, price:req.body.price, url:req.body.url}, function(err,data){
        if(err){
            console.log(err);
        } else {
            console.log("new thing", data)
            res.json(data);
        }
    });
})
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./AngularApp/dist/index.html"))
});
app.listen(8000, function() {
    console.log("listening on port 8000");
});