import { Box, Button, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from "./Logo";
import TitleBox from "./TitleBox";
import MainLayout from "../layouts/MainLayout";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  const location = useLocation();

  useEffect(() => {
    const validStatusList = [400, 200];
    const fetchData = async () => {
      if (!location || !location.state || !location.state.status) { // nhập url trực tiếp chuyển về home
        navigate('/');
      } else if (
        validStatusList.includes(location.state.status) // trường hợp 200 400 chuyển về home khác status khác sẽ ở lại page
      ) {
        navigate('/');
      }
    };

    fetchData();
  }, [location, navigate]);


  return (
    <MainLayout>
      <Box
        sx={{
          width: {
            sm: "90vw",
            xs: "90vw",
            md: "60vw",
            lg: "60vw",
            xl: "60vw",
          },
        }}
      >
        {/* GRID SYSTEM */}
        <Grid container height="90vh">
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            minHeight={550}
            sx={{
              boxShadow: {
                xs: "",
                sm: "",
                md: "15px 2px 5px -5px",
                lg: "15px 2px 5px -5px",
                xl: "15px 2px 5px -5px",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 24, 57, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                borderRadius: {
                  xs: "30px",
                  sm: "30px",
                  md: "30px 0 0 30px",
                  lg: "30px 0 0 30px",
                  xl: "30px 0 0 30px",
                },
              }}
            >
              <Box width="80%">
                <Box display="flex" flexDirection="column" alignItems="center">
                  {/* LOGO */}
                  <Logo />
                  {/* LOGO END */}

                  <Typography variant="h6" gutterBottom color="#primary" sx={{ mt: 4, pt: 5, color: `${colors.red[500]}` }} >
                    System failed , This function is updating , Please contact us by tel 0988892157 .
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  mt={2}
                  width="100%"
                  color="white"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    fullWidth
                    sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                  >Go Back</Button>
                </Box>

              </Box>
            </Box>
          </Grid>
          <TitleBox />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default ErrorPage;