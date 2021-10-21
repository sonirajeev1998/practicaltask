import React,{useState} from "react"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {getData ,postData, postDataAndImage} from "../../FetchNodeServices"

const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10,
    borderRadius:10

  },

  subdiv:{
    width:800,
    background:'#b2bec3',
    padding:10,
    borderRadius:10
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: 'none',
  },

 
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 400,
  },
   
  }));


  export default function FoodItems(props){
    const classes = useStyles();
    const [restaurantId,setRestaurantId]=useState("")
    const [foodItem,setFoodItem]=useState("")
    const [foodItemType,setFoodItemType]=useState("")
    const [Price,setPrice]=useState("")
    const [foodItemImage,setFoodItemImage]=useState({bytes:'',file:'/noimage.png'})
    const [foodItemAdImage,setFoodItemAdImage]=useState({bytes:'',file:'/noimage.png'})
    const handleFoodItemAdImage=(event)=>{
      setFoodItemAdImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    }

    
    const handleSubmit=async()=>{

      var formData = new FormData()
         formData.append('restaurant_id',restaurantId)
         formData.append('fooditem',foodItem)
         formData.append('fooditemtype',foodItemType)
         formData.append('price',Price)
         formData.append('fooditemimage',foodItemImage.bytes)
         formData.append('fooditemadimage',foodItemAdImage.bytes)
         var config = { headers: { "content-type": "multipart/form-data" } };
         var res = await postDataAndImage(
           "fooditem/fooditems",
           formData,
           config
         );

        if (res.result) {
          swal({
            title: "Food Items Added Successfully",
            icon: "success",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Fail to Food Items Types",
            icon: "warning",
            dangerMode: true,
          });
        }


    
  };

  return(<div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={1}>

    <Grid item xs={12} >
       <label style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}><b>Food Items</b></label>
      </Grid> 

    <Grid item xs={12} >
       <TextField label="Restaurant Id" value={restaurantId}  fullWidth variant="outlined" onChange={(event)=>setRestaurantId(event.target.value)}/>
      </Grid> 

      <Grid item xs={12} sm={6} >
       <TextField label="Food Item" fullWidth variant="outlined" onChange={(event)=>setFoodItem(event.target.value)}/>
      </Grid>
      <Grid item xs={12} sm={6} >
       <TextField label="Food Item Type" fullWidth variant="outlined" onChange={(event)=>setFoodItemType(event.target.value)}/>
      </Grid> 


      <Grid item xs={12} sm={6} >
       <TextField label="Price" fullWidth variant="outlined" onChange={(event)=>setPrice(event.target.value)}/>
      </Grid> 
      
     
       <Grid item xs={12} sm={6} >
       <label style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:20}}>Food Item Image</label>
       </Grid>  

       <Grid item xs={12} sm={6}>
         <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <input accept="image/*"  className={classes.input} id="icon-button-FoodItemImage" type="file" multiple onChange={(event)=>setFoodItemImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})} />
    <label htmlFor="icon-button-FoodItemImage">
      <IconButton color="primary"  aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
    <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={foodItemImage.file} className={classes.large} />
    </div>
     </Grid>

     <Grid item xs={12} sm={6} >
       <label style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'20'}}>Food Item Ad Image</label>
       </Grid>  

       
       <Grid item xs={12} sm={6}>
         <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <input accept="image/*"  className={classes.input} id="icon-button-FoodItemAdImage" type="file" multiple onChange={(event)=>handleFoodItemAdImage(event)} />
    <label htmlFor="icon-button-FoodItemAdImage">
      <IconButton color="primary"  aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
    <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={foodItemAdImage.file} className={classes.large} />
    </div>
     </Grid>
    
       </Grid>   
      <Grid item xs={12} sm={6}>
      <Button variant="outlined"  onClick={()=>handleSubmit()}  fullWidth color="primary">
       Submit
     </Button>
      </Grid>  

      <Grid item xs={12} sm={6}>
      <Button variant="outlined" fullWidth color="primary">
       Reset
      </Button>
      </Grid>
      

      


      </div>
      </div>)
}
