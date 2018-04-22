let express     = require('express'),
    app         = express(),
    path        = require('path'),
    body_parser = require('body-parser'),
    mongoose    = require('mongoose')

app.use(body_parser.json());
//app.use(bodyParser.urlencoded());
app.use(express.static( __dirname + '/client/dist' ));

mongoose.connect('mongodb://localhost/commerce_db')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema;

var CommerceSchema = new mongoose.Schema({
	name: {type:String, required:[true, "Product name is required"], minlength:[3, "Name must be atleast 3 characters long"]},
	qty: {type: Number, required:[true, "Qty is required"], min:[1,"Product quantity must be greater than 0"]},
  price: {type: Number, required:[true, "Price is required"], min:[1, "Price must be greater than 0"]}
})


mongoose.model('Item', CommerceSchema) 
var Item = mongoose.model('Item')


//get all items
app.get('/product', function(req, res){
    //console.log("Hi")
	Item.find({}, (err,products)=>{
		if(err){
			console.log("errors")
			res.json({message:"Error", error: err})
		}
		else{
			res.json(products)
		}
	})
})


//get one product
app.get('/product/:id', function(req,res){
    Item.findOne({_id: req.params.id}, (err,product)=>{
        if(err){
            console.log("errors")
            //res.json({message:"Error", error: err})
            res.status(400).json(err.errors);
        }
        else{
            res.json(product)
        }
    })

})
     

//add a new product
app.post('/productnew', function(req,res){

    console.log('req.body', req.body , "ends");
	  var item = new Item({name: req.body.name, qty: req.body.qty, price: req.body.price})
    item.save(function(err){
        if(err) {
            console.log('Error');
            //res.json(err)
            res.status(400).json(err.errors);
        } else {
            res.json(item);
        }
         
     });
})


//update a product
app.post('/updateproduct/:id', (req,res)=>{
  Item.findOne({_id: req.params.id}, function(err, item) {
    if (err) {
      console.log('erors');
      res.json(err);
    }
    item.name = req.body.name;
    item.qty = req.body.qty;
    item.price = req.body.price
    console.log(req.body)
    item.save(function(err) {
      if (err) {
        console.log('errors')
        res.status(400).json(err.errors);
      } else {
        res.json(err)
      }
    })
  })
})

app.delete('/deleteproduct/:id', (req,res)=>{
    console.log("here")
    Item.remove({_id:req.params.id, qty:1}, function(err){
      if(err){
        res.status(400).json(err)
      }
      else{
        res.json({deletemessage: 'Successful'})
      }
      
    })
})


app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(6769, function() {
    console.log("listening on port 6769");
})