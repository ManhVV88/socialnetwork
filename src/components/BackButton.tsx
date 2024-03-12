import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, colors } from '@mui/material';
import { useNavigate  } from 'react-router-dom';

class BackButton extends Component {

    history = useNavigate();

    handleClick = () => {
        this.history(-1);
    };

    render() {
        return <Button 
        variant="contained" 
        color="primary" 
        onClick={this.handleClick}
        fullWidth
        sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
        >
            Go Back
        </Button>;
    }
}

export default connect(null)(BackButton);