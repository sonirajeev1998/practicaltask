var express = require('express');
var router = express.Router();
var pool = require("./pool")  
var upload = require("./multer");


/* GET home page. */
router.post('/fooditems', upload.any(),function(req, res, next) {
   console.log(req.files) 
    pool.query("insert into addfood(restaurant_id,fooditem,fooditemtype,price,fooditemimage,fooditemadimage) values(?,?,?,?,?,?)",[req.body.restaurant_id,req.body.fooditem,req.body.fooditemtype,req.body.price,req.files[0].originalname,req.files[1].originalname],function(error,result){
 
       if(error)
       { console.log(error)
       res.status(500).json({result:false})

       }
       else
       {res.status(200).json({result:true})}

    })
    
  
   });

module.exports = router;

   