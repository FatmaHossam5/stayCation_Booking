
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

const[facilities,setFacilities]=React.useState([{"value":'','label':''}])
const[selectedValue,setSelectedValue]=React.useState([])
const [value,setValue]=React.useState([])

console.log(facilities);

{/*Add Room Function */}

const AddNewRoom =(data)=>{
  const formattedSelected=selectedValue.map(({value})=>value)
  console.log(formattedSelected);
  
  // const addFormData = new FormData()
  // addFormData.append("roomNumber",data['roomNumber'])
  // addFormData.append("imgs",data['imgs'])
  // addFormData.append("price",data['price'])
  // addFormData.append("capacity",data['capacity'])
  // addFormData.append("discount",data['discount'])
  // addFormData.append("facilities",formattedSelected)



  axios.post('http://154.41.228.234:3000/api/v0/admin/rooms',{...data,imgs:data.imgs[0],facilities},{headers:{...Headers,"Content-Type":"multipart/form-data"}}).then((response)=>{
   

    console.log(response);
  
  }).catch((error)=>{
    console.log(error);
    
  })







}
{/*Get All Facilities */}
const getAllFacilities=()=>{
  axios.get('http://154.41.228.234:3000/api/v0/admin/room-facilities',{headers:Headers}).then((response)=>{console.log(response?.data?.data?.facilities);
  setFacilities(response?.data?.data?.facilities)
  const newFacilities=response?.data?.data?.facilities
const facilities=newFacilities.map(({_id:value,name:label})=>({value,label}))
setFacilities(facilities)
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

  
  <Select

   options={facilities}
values={facilities.filter((data)=>selectedValue.includes(data.value))}
 onChange={(selectedValue)=>setSelectedValue(selectedValue)}

  

   multi
  

  >

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
