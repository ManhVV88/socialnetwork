import { Box, Button, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from "./Logo";
import TitleBox from "./TitleBox";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);


  const handleLogout = () => {
    setAuthenticated(true);
    navigate('/');
  };


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

                  <Typography variant="h3" gutterBottom color="#primary" sx={{ mt: 4, pt: 5, color: `${colors.green[100]}` }} >
                    this is Admin page.
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
                    onClick={handleLogout}
                    fullWidth
                    sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                  >Log Out</Button>
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

export default Admin;