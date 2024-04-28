// import img2 from '../../../assets/download.png'
import img1 from '../../../../assets/Rectangle 7.png'
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import styles from './MostPickedTaskTest.module.css'
import axios from 'axios';
import { AuthContext } from '../../../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function MostPickedSection() {

  const { userRole, reqHeaders }: any = useContext(AuthContext)
  const [ads, setAds] = useState();

  const getMostPicked = () => {
    axios.get("http://154.41.228.234:3000/api/v0/portal/ads", {
      headers: reqHeaders
    })
      .then((response) => {
        setAds(response.data.data.ads)
        console.log(response.data.data.ads);
        
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getMostPicked()
    
  }, [])

  return (
    <div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center" }}>

        <Grid item xs={10} >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
            Houses with beauty backyard
          </Typography>
        </Grid>

        {/* main section */}
        <Grid item xs={10} container sx={{ justifyContent: "space-between" }}>
          {
            ads? 
            ads?.map((item: any) => {
              return (

                <div className={`${styles.child}`}>
                 
                  <div className={`${styles.badge}`}>{item?.room?.discount}% off</div>
                  <img src={item?.room?.images?.length == 0 ?
                    img1
                    : item?.room?.images[0]?.startsWith("http")
                      ? item?.room?.images[0]
                      : `http://154.41.228.234:3000` + item?.room?.images[0]}
                    style={{ width: "100%", height: "100%", borderRadius: "0.7rem" }} alt="" />
                  <div className={`${styles.details}`}>
                    <p style={{ fontSize: "20px", marginBottom: "0.3rem" }}>Ocean Land</p>
                    <p>Room price : {item?.room?.price} </p>
                  </div>

                  <div style={{ marginBottom: "1erm" }}>
                    <Typography variant="body1" component="p">
                      Room number : {item?.room?.capacity}
                    </Typography>
                    <Typography variant="caption" component="p" sx={{ color: "#B0B0B0" }}>
                      Room number : {item?.room?.roomNumber}
                    </Typography>
                  </div>
                </div>
              )
            })
            : <h3 style={{textAlign:"center", marginY: "3rem"}}>Loading ... </h3>
            }

        </Grid>

      </Grid>
    </div>
  )
}