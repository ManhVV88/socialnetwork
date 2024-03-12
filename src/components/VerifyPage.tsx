import { Box, Button, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useContext, useEffect, useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input';
import Logo from "./Logo";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import TitleBox from "./TitleBox";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

const VerifyPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [mes, setMessage] = useState("");
  const [checkOtp, setCheckOtp] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const authSerivce = AuthService;
  const { setAuthenticated, setRole, setToken } = useContext(AuthContext);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    const validStatusList = [200];

    const fetchData = async () => {
      if (!location || !location.state || !location.state.status) {
        navigate('/');
      } else if (
        !validStatusList.includes(location.state.status)
      ) {        
        navigate('/');
      } else {
        setUsername(location.state.username);
      }
    };
    
    fetchData();
  }, [navigate,location]);

  const validateOtp = () => {
    if (otp.length !== 6) {
      setMessage("Please enter full code Otp ! ");
      return false;
    }
    return true;
  }

  const onSubmitVerify = () => {
    let validate = validateOtp();
    setCheckOtp(validate);
    if (validate) {
      authSerivce.verifyOtp(username, otp)
        .then(res => {
          let status = null;
          if (res?.response?.status) {
            status = res.response.status;
          } else if (res?.status) {
            status = res.status
          }
          if (status === 400) {
            setMessage("Otp code is valid ! ");
            setCheckOtp(false);
          } else if (status === 200) {
            console.log(res.data.role[0].authority.toString());
            setRole(res.data.role[0].authority.toString());
            setToken(res.data.authToken);
            setAuthenticated(true);
            navigate('/home');
          } else {
            navigate('/error');
          }
        })
        .catch(
          error => {
            console.log("verify error ");
            console.log(error);
          }
        );
    }
  }

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

                  <Typography color="white" fontWeight="bold" mt={7} mb={3} >
                    Enter your Otp
                  </Typography>
                </Box>

                {/* INPUTS */}
                {/* <CustomInput
                label="OTP"
                placeholder="Enter your Otp..."
                isIconActive={false}                       
                value={otp}
                onChange={handleOtpChange}    
              />              */}

                <MuiOtpInput length={6} value={otp} onChange={handleOtpChange} />
                {/* INPUT END */}

                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  mt={2}
                  width="100%"
                  color="white"
                >


                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                  onClick={onSubmitVerify}
                >
                  Verify
                </Button>
                {
                  checkOtp ? "" :
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      mt={2}
                      width="100%"
                      color="white"
                    >


                      <Typography variant="body1" gutterBottom color="#primary" sx={{ pt: 2, color: `${colors.red[300]}` }} >
                        * {mes}
                      </Typography>
                    </Box>
                }
              </Box>
            </Box>
          </Grid>
          <TitleBox />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default VerifyPage;