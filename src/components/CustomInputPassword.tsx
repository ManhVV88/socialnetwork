import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { colors } from "../theme";

const CustomInputPassword: React.FC<{
  isIconActive: boolean;
  label: string;
  placeholder: string;
  isOn: boolean;
  setIsIconActive: (isOn: boolean) => void;
  value: string;
  onChange: (value: string) => void;
}> = ({ isIconActive, label, placeholder, isOn, setIsIconActive, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography color="white" pb={1}>
          {label}
        </Typography>
        <Paper
          sx={{
            background: colors.input[500],
            width: "100%"
          }}
        >
          <InputBase
            placeholder={placeholder}
            fullWidth
            required
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: "5px",
            }}
            type={isOn ? "password" : "text"}
            endAdornment={
              isIconActive && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton edge="end" onClick={() => setIsIconActive(!isOn)}>
                    {isOn ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
            defaultValue={value}
            onChange={handleChange}
            inputProps={{ maxLength: 72 }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomInputPassword;
