import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const  DialogRegister: React.FC<{
  open : boolean;  
  handleClose: (open: boolean) => void; 
}> = ({open,handleClose}) => {
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <React.Fragment>      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="sm"      
         
      >
        <DialogTitle id="responsive-dialog-title" sx={{bgcolor:'#224239'}} >
          {"Register"}
        </DialogTitle >
        <DialogContent sx={{bgcolor:'#224239'}}  >
          <DialogContentText>
            Register Successfully .
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{bgcolor:'#224239'}} >          
          <Button onClick={() => handleClose(open)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogRegister;