
import { Box, Button, FormControl, TextField,MenuItem } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-dropdown-select';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// const addRecipe =(data)=>{

//   const addFormData =new FormData();
//   addFormData.append("name",data['name'])
//   addFormData.append("price",data['price'])
//   addFormData.append("description",data['description'])
//   addFormData.append("tagId",data['tagId'])
//   addFormData.append("categoriesIds",data['categoriesIds'])
//   addFormData.append("recipeImage",data['recipeImage'][0])
//   axios.post("https://upskilling-egypt.com:443/api/v1/Recipe/",addFormData,{
//     headers:{
//       Authorization:`Bearer ${localStorage.getItem("adminToken")}`,
//       'Content-Type': 'multipart/form-data',
//     }
//   }).then((response)=>{console.log(response);
//     handleClose()
//     getAllRecipes()
//   }).catch((error)=>{
//     console.log(error);
//   })
  
      
//     }
    
export default function AddRoom() {
  const [age, setAge] =React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
  setAge(event.target.value);
};
const[imgs,setImgs]=React.useState(''),
 handleImage =(e)=>{
  setImgs(e.target.files[0])
}
const {register,handleSubmit,formState:{errors}}=useForm()
let reqHeaders='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDUzNjEyMCwiZXhwIjoxNzA1NzQ1NzIwfQ.p15lXfscJSFl8OJ4drIUj0vPPS3nO4L_U6iTbtwBdf8'
let Headers ={Authorization:reqHeaders}
const [val,setVal]=React.useState([])
const[facilities,setFacilities]=React.useState([{"name":"",'_id':""}])

{/*Add Room Function */}

const AddNewRoom =(data)=>{
  const addFormData = new FormData()
  addFormData.append("roomNumber",data['roomNumber'])
  addFormData.append("imgs",data['imgs'])
  addFormData.append("price",data['price'])
  addFormData.append("capacity",data['capacity'])
  addFormData.append("discount",data['discount'])
  addFormData.append("facilities",data['facilities'])
  console.log(data['facilities']);
  axios.post('http://154.41.228.234:3000/api/v0/admin/rooms',addFormData,{headers:Headers}).then((response)=>{
    console.log(response);
  
  }).catch((error)=>{
    console.log(error);
    
  })







}
{/*Get All Facilities */}
const getAllFacilities=()=>{
  axios.get('http://154.41.228.234:3000/api/v0/admin/room-facilities',{headers:Headers}).then((response)=>{console.log(response?.data?.data?.facilities);
  setFacilities(response?.data?.data?.facilities)
  }).catch((error)=>{console.log(error);
  })
}


React.useEffect(()=>{getAllFacilities()},[])
  return (
    <>

<Box >
<FormControl component='form'  sx={{bgcolor:"blue",display:"flex" ,justifyContent:"center",alignItems:"center"}} defaultValue="" required onSubmit={handleSubmit(AddNewRoom)}>

<TextField sx={{width:"40%",m:5}} label="Room Number" id="fullWidth" {...register("roomNumber")} />
<Box>
<TextField
  sx={{mr:5}}
  helperText=""
  id="demo-helper-text-aligned"
  label="Price"
  {...register("price")}/>
<TextField

  helperText=" "
  id=""
  label="Capacity"
  {...register("capacity")}
/>
</Box>
<Box>
<TextField
 sx={{mr:5}}
  helperText=""
  id="demo-helper-text-aligned"
  label="Discount"
  {...register("discount")}
/>
{/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Facilities</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
 
      </FormControl> */}
  
  <Select
  name='select'options={facilities}>

  </Select>
  
    
    

</Box>

<Box>
<input type="file" onChange={handleImage} {...register('imgs')} />

</Box>
<Box sx={{display:"flex",justifyContent:"end" }}>
<button type='submit'> Save</button>
</Box>

</FormControl>


</Box>


    </>
  )
}
