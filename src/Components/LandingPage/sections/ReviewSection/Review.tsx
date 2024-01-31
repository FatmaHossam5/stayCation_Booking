import { useContext, useState } from "react"
import { useParams } from "react-router"
import { AuthContext } from "../../../../Context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import { Box, Button, Grid, Typography } from "@mui/material"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useForm } from "react-hook-form"

export default function Review() {

    let { id } = useParams()
    const [rating, setRating] = useState('')
    const { reqHeaders, role }: any = useContext(AuthContext)

    //start text area styles
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );
    // end text area styles

    //start send comment
    const Comment = () => {

        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({ mode: "all" })

        const sendComment = (data: any) => {
            console.log(data);

            if (role != "user") {
                toast.warning(`you should login first`);
            } else {
                axios.post(`http://154.41.228.234:3000/api/v0/portal/room-comments`, {

                    roomId: id,
                    comment: data.comment

                }, {
                    headers: reqHeaders
                })
                    .then((response) => {
                        console.log(response);
                        toast.success(response.data.message);
                    })
                    .catch((error) => {

                        console.log(error);
                        toast.error(error.response.data.message)
                    }
                    )
            }
        }

        return (
            <form action="" onSubmit={handleSubmit(sendComment)}>

                <Box sx={{ position: "relative", width: "57%" }}>
                    <Textarea aria-label="minimum height" minRows={3} placeholder="Enter your comments..."
                        {...register("comment",
                            {
                                required: true,
                                pattern: /^[a-zA-Z ]{4,}$/
                            }
                        )} />

                    {errors.comment && errors.comment.type == "required" ?
                        <Box sx={{ color: 'error.main' }}>Please, Fill your comment</Box> :
                        errors.comment && errors.comment.type == "pattern" &&
                        <Box sx={{ color: 'error.main' }}>Not a vaild text!</Box>}

                    <Box sx={{ position: "absolute", top: "100%", right: "0" }}>
                        <Button type="submit" variant="contained" sx={{ padding: "0.3rem 2.5rem", marginTop: "1rem" }}>Send</Button>
                    </Box>
                </Box>

            </form>
        );
    };
    //end send comment

    //start send review
    const Review = () => {
        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({ mode: "all" })

        const sendReview = (data: any) => {
            let dataWithRating = { ...data, rating: rating }
            if (role != "user") {
                toast.warning(`you should login first`);
            } else if (dataWithRating.rating.length !== 0) {
                axios.post(`http://154.41.228.234:3000/api/v0/portal/room-reviews`, {
                    roomId: id,
                    rating: dataWithRating.rating,
                    review: dataWithRating.review

                }, {
                    headers: reqHeaders
                })
                    .then((response) => {
                        console.log(response);
                        toast.success(response.data.message);
                    })
                    .catch((error) => {

                        console.log(error);
                        toast.error(error.response.data.message)
                    }
                    )
            } else {
                toast.warning('Choose rate with your message');
            }
        }

        return (
            <form action="" onSubmit={handleSubmit(sendReview)}>

                <Stack spacing={1} >
                    <Rating name="unique-rating" onChange={(e) => (setRating(e.target.value))} defaultValue={0}
                        precision={0.5}
                    />
                </Stack>

                <Typography variant="body1" component="p" sx={{ marginY: "1rem" }}>
                    Message
                </Typography>

                <Textarea aria-label="minimum height" minRows={3} placeholder="Enter your review about this room..."
                    {...register("review"
                        , {
                            required: true,
                            pattern: /^[a-zA-Z ]{4,}$/
                        }
                    )}
                />
                {errors.review && errors.review.type == "required" ? <Box
                    sx={{ color: 'error.main' }}>fill your review first</Box>
                    : errors.review && errors.review.type == "pattern" &&
                    <Box sx={{ color: 'error.main' }}>Not a vaild text!</Box>}

                <Box>
                    <Button type="submit" variant="contained" sx={{ padding: "0.3rem 2.5rem", marginTop: "1rem" }}>Rate</Button>
                </Box>
            </form>
        );
    };
    //end send review

    return (
        <>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center", padding: "3rem 0" }}>


                {/* main section */}
                <Grid item xs={10} container sx={{ justifyContent: "space-between", border: "1px solid #E5E5E5", paddingY: "2rem", borderRadius: "15px" }}>

                    <Grid item xs={5} >
                        <Box>
                            <Typography variant="body1" component="p" sx={{ marginBottom: "1rem" }}>
                                Rate
                            </Typography>
                            <Review />
                        </Box>
                    </Grid>

                    <Grid item xs={1} container sx={{ alignItems: "center" }}>
                        <div style={{ height: "100%", width: "1px", backgroundColor: "#3498db" }}></div>
                    </Grid>

                    <Grid item xs={6} >
                        <Box>
                            <Typography variant="body1" component="p" sx={{ marginBottom: "2rem" }}>
                                Add Your Comment
                            </Typography>
                            <Comment />
                        </Box>
                    </Grid>

                </Grid>

            </Grid>
        </>
    )
}
