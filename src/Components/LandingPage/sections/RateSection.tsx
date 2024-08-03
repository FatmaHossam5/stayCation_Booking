
import  photo from "../../../assets/foto_keluarga.png";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

const RateSection = () => {
 
  return <>
    <Box component="section" className="reviewSec" sx={{display:'flex', justifyContent:'space-evenly',alignItems:'center'}}>
      <Box className="reviewImg">

        <img src={photo} className="imgReview" alt="user review" />
      </Box>

      <Box className="reviewCon">
        <Typography className="reviewTitle">
          HappyFamily
        </Typography>
        <Typography>
          <Rating className="stars" name="read-only" value={5} readOnly />
        </Typography>
        <Typography className="reviewDis">
        What a great trip with my family and I should try again next time soon ..        </Typography>
        <Typography color={"gray"} className="reviewCap" variant="caption">
        Angga, Product Designer

        </Typography>
      </Box>

    </Box >
  </>
}

export default RateSection