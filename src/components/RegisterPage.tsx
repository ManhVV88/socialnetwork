import { Box, Button, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import CustomInput from "./CustomInput";
import CustomInputPassword from "./CustomInputPassword";
import Logo from "./Logo";
import AuthService from "../services/AuthService";
import DialogRegister from "./Dialog/DialogRegister";
import TitleBox from "./TitleBox";
import MainLayout from "../layouts/MainLayout";

const RegisterPage: React.FC = () => {
  const [setIsOn, setIsPasswordIconActive] = useState(true);
  const [setIsOn2, setIsPasswordIconActive2] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [mes, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
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

    if (confirmPassword.length < 3 || confirmPassword.length > 72) {
      setMessage("password must be in 3~72 character");
      return false;
    }

    if (password !== confirmPassword) {
      setMessage("password not matching");
      return false;
    }

    return true;
  };
  const authSerivce = AuthService;

  const onRegister = () => {
    let isValid = validatePasswords();
    setIsPasswordMatch(isValid);
    if (isValid) {
      authSerivce.register(username, password)
        .then(res => {
          let status = null;
          if (res?.response?.status) {
            status = res.response.status;
          } else if (res?.status) {
            status = res.status
          }
          if (status === 400) {
            setMessage(res.response.data);
            setIsPasswordMatch(false);
          } else if (status === 200) {
            setOpen(true);
          } else {
            navigate('/error', { state: { status: status } });
          }
        }).catch(error => {
          navigate('/error', { state: { status: error.response.status } });
        });
    }
  };



  const handleClose = () => {
    setOpen(false);
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
                <CustomInputPassword
                  label="Confirm Password"
                  placeholder="Enter your confirm password..."
                  isIconActive={true}
                  isOn={setIsOn2}
                  setIsIconActive={setIsPasswordIconActive2}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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

                  <Link
                    to="/"
                    style={{
                      color: colors.green[500],
                      textDecoration: "none",
                    }}
                  >
                    You have account ?
                  </Link>
                </Box>
                {
                  isPasswordMatch ? "" :
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
                  onClick={onRegister}
                >
                  Register
                </Button>
                <DialogRegister open={open} handleClose={handleClose} />
              </Box>
            </Box>
          </Grid>
          <TitleBox />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default RegisterPage;
