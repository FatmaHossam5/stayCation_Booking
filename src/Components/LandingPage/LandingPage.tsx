import Footer from "../shared/Footer/Footer";
import RateSection from './sections/RateSection'
import {
  Grid,
  Typography,
  Card,
  Button,
  Container,
  Box,

} from "@mui/material";
import Date from '../Date/Date.tsx';
import MostPickedSection from "./sections/MostPicked/MostPickedSection.tsx";

export default function LandingPage() {

  return (
    <div>

      <Box sx={{ height: "100vh", marginLeft: 3 }}>
        <Date />
        <MostPickedSection />
        <RateSection />
        <Footer />
      </Box>



    </div>
  );
}

