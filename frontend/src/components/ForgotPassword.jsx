import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';

function ForgotPassword({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none', backgroundColor: "#1e1e2f", border: "2px solid rgba(255, 255, 255, 0.2)" },
        },
      }}
    >
      <DialogTitle sx={{color: '#d1d1e0'}}>Reset Password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText sx={{color: '#d1d1e0'}}>
          Enter your username to reset your password.
        </DialogContentText>
         
        <TextField
        size='small'
  autoFocus
  required
  margin="dense"
  id="username"
  name="username"
  label="Username"
  placeholder="Enter your username"
  type="username"
  fullWidth
  variant="outlined"
  InputProps={{
    sx: {
      borderRadius: 2,
      backgroundColor: '#2a2a40',
      color: '#d1d1e0',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#555',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#7f5af0',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#7f5af0',
      },
      '& input::placeholder': {
        color: '#999',
        opacity: 1,
      },
    },
  }}
  InputLabelProps={{
    sx: {
      color: '#aaa',
      '&.Mui-focused': {
        color: '#7f5af0',
      },
    },
  }}
/>

      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button sx={{textTransform: "none", color: "#7f5af0"}} onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" sx={{textTransform: "none", backgroundColor: "#7f5af0"}}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
