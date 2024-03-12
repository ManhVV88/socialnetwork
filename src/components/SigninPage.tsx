import { Box, Button, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomInputPassword from "./CustomInputPassword";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import validator from "validator";
import AuthService from "../services/AuthService";
import TitleBox from "./TitleBox";
import MainLayout from "../layouts/MainLayout";

const SigninPage: React.FC = () => {
  const [setIsOn, setIsPasswordIconActive] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidOk, setpasswordValidOk] = useState(true);
  const [mes, setMessage] = useState("");
  const authSerivce = AuthService;
  const navigate = useNavigate();

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const validatePasswords = () => {
    if (!validator.isEmail(username)) {
      setMessage("username must be your email");
      return false;
    } else if (username.length < 8 || username.length > 36) {
      setMessage("password must be in 8~36 character");
      return false;
    }

    if (password.length < 3 || password.length > 72) {
      setMessage("password must be in 3~72 character");
      return false;
    }
    return true;
  }
  const onLogin = () => {
    let validatePass = validatePasswords();
    setpasswordValidOk(validatePass);
    if (validatePass) {

      authSerivce.login(username, password)
        .then(res => {
          let status = null;
          if (res?.response?.status) {
            status = res.response.status;
          } else if (res?.status) {
            status = res.status
          }
          if (status === 400) {
            console.log(res);
            setMessage("Username or Password invalid ! Please enter again");
            setpasswordValidOk(false);
          } else if (status === 200) {
            console.log(res.data);
            navigate('/verifyOtp', { state: { status: status, username: username } })
          } else {
            navigate('/error', { state: { status: status } });
          }
        })
        .catch(error => {
          console.log(error);
          // navigave('/error',{state : {status : error}});
        });

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

                  <Typography color="white" fontWeight="bold" mt={7} mb={3}>
                    Sign in to dashboard
                  </Typography>
                </Box>

                {/* INPUTS */}
                <CustomInput
                  label="Username"
                  placeholder="Enter your Username..."
                  isIconActive={false}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <CustomInputPassword
                  label="Password"
                  placeholder="Enter your password..."
                  isIconActive={true}
                  isOn={setIsOn}
                  setIsIconActive={setIsPasswordIconActive}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {/* INPUT END */}

                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  mt={2}
                  width="100%"
                  color="white"
                >
                  <div style={{ display: "flex" }}>
                    <Link
                      to="/register"
                      style={{
                        color: colors.green[500],
                        textDecoration: "none",
                      }}
                    >
                      Register account?
                    </Link>
                  </div>
                  <Link
                    to="/forget_password"
                    style={{
                      color: colors.green[500],
                      textDecoration: "none",
                    }}
                  >
                    Forget password?
                  </Link>
                </Box>
                {
                  passwordValidOk ? "" :
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
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                  onClick={onLogin}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>
          <TitleBox />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default SigninPage;
