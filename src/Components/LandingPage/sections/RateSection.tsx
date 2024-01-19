
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import axios from 'axios';

export default function Rate() {

  const [rate, setRate] = useState()
  
  const getReviews = () => {
    axios.get("http://154.41.228.234:3000/api/v0/portal/room-reviews/65a995cca5d9953dd42d1152", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlhMjAzNTYzODg0OGJjZTZmMDBmOTciLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzA1NjEyNDgwLCJleHAiOjE3MDY4MjIwODB9.3cdcgYBnwf4VNWPbMJcOn0sMPBtgPqY7_90Bmf5mxqw"
      }
    })
      .then((response) => {
        console.log(response.data.data.roomReviews);
        setRate(response.data.data.roomReviews)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getReviews()
  }, [])

  // let [currentImage, SetcurrentImage] = useState<number>(0);

  // const PrevNextImages = (e: string) => {
  //   if (e === "next") {
  //     if (currentImage < images.length - 1) {
  //       SetcurrentImage((currentImage + 1));
  //     } else {
  //       SetcurrentImage(0);
  //     }
  //     return null;
  //   } else if (e === "prev") {
  //     if (currentImage === 0) {
  //       SetcurrentImage(images.length - 1)
  //     }
  //     else if (currentImage <= images.length - 1) {
  //       SetcurrentImage((currentImage - 1));
  //     }
  //   }
  //   return null;
  // };

  return (

    <>
      {
        rate?.map((review) => { 
                   
          return (
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center", padding: "3rem 0" }}>
              <Grid item xs={4} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <section className="slider">
                    <img src={(review?.user?.profileImage).startsWith("http") ? 
                    review?.user?.profileImage 
                    :`http://154.41.228.234:3000/` + review?.user?.profileImage }
                      
                    className="image" style={{ width: "100%" }} />
                  </section>
                  <Box sx={{ textAlign: "center" }}>
                    <ArrowCircleLeftOutlinedIcon onClick={() => PrevNextImages("prev")} sx={{ color: "#203FC7", fontSize: "3rem", marginRight: "1rem" }}
                    />
                    <ArrowCircleRightOutlinedIcon onClick={() => PrevNextImages("next")} sx={{ color: "#203FC7", fontSize: "3rem" }} />
                  </Box>
                </Typography>
              </Grid>

              <Grid item xs={6} container sx={{ alignItems: "center" }}>

                <Box sx={{ paddingLeft: "2rem" }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1.5rem", fontWeight: "500" }}>
                    {review.room.roomNumber}
                  </Typography>

                  <Box
                    sx={{
                      '& > legend': { mt: review.rating },
                    }}
                  >

                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                    />

                    <Box>
                      <Typography sx={{ fontSize: "1.7rem", width: "85%" }} component="legend" variant="body2">
                        {review.review}</Typography>
                    </Box>

                    <Typography sx={{ color: "#B0B0B0" }} variant="caption">
                      {review.user.userName}
                    </Typography>

                  </Box>
                  <Button variant="contained" sx={{ padding: "0.3rem 2.5rem", marginTop: "1rem" }}>Read Their Story</Button>
                </Box>

              </Grid>
            </Grid>
          )
        })
      }

    </>
  )
}

