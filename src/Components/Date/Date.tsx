import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import IconButton from '@mui/material/IconButton'
import{format}  from 'date-fns'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { TextField } from '@mui/material';
import { Button } from '@mui/base';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function MyDate() {

  const[open,setOpen]=useState(false)
  const[count,setCount]=useState(0)
  const [date,setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const handleChange=(ranges)=>{
    setDate(ranges.selection)
  }
  const handleClick =()=>{
    setOpen((prev)=>!prev)
  }
  const handleIncrement =()=>{
    setCount(count+1)
  }
  const handleDecrement =()=>{
    setCount(count-1)
  }
  return (
    <>
    <div style={{display:'flex',alignItems:"center",marginTop:5}}>
    <IconButton aria-label="" onClick={handleClick}>
 <EventAvailableIcon />
 </IconButton>
    <TextField
  type="text"
  value={`${format(date.startDate, 'ddMMM')} - ${format(date.endDate, 'ddMMM')}`}
sx={{textAlign:"center"}}



/> 
    </div>
   {open&& <DateRangePicker
      ranges={[date]}
      onChange={handleChange}
      minDate={new Date()}
      />
    }
    <div style={{marginLeft:"15px"}}>
   
        <IconButton   sx={{bgcolor:"red",borderRadius:"5px",width:"60px" ,height:"30px"}} variant="contained"  onClick={handleDecrement}>
        <RemoveIcon sx={{color:"white"}}  />
      </IconButton>

      <input
        type="text"
        value={`${count} Person`}
        variant="outlined"
        style={{ borderRadius:"5px", width:"60px" ,height:"30px", border:"none", backgroundColor: "#f0f0f0" , pointerEvents: "none", paddingLeft:"55PX",paddingRight:"55PX",
        color: "black"}}
        
      />

        <IconButton  sx={{bgcolor:"#1ABC9C",borderRadius:"5px",width:"60px" ,height:"30px"}}    variant="contained"onClick={handleIncrement} >
        <AddIcon sx={{color:"white"}} />
      </IconButton> 
    </div>
    </>
  )
}
