import { Box,colors, Typography } from "@mui/material";
import React from "react";

const Logo: React.FC = () => {   
    return (
        <Box
                  sx={{
                    mt: "60px",
                    width: "50px",
                    height: "50px",
                    bgcolor: "primary.main",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 20px ${colors.green[500]}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="white">
                    SC
                  </Typography>
                </Box>
    );
}

export default Logo;