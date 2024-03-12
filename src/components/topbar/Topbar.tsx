import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext} from 'react';
import '../topbar/Topbar.css';
import { Avatar } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  // pointerEvents: 'all',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  'z-index': 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface TopbarProps {
  imageUrl: string;
}

const Topbar: React.FC<TopbarProps> = ({ imageUrl }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate('/');
  };

  const handleSearch = () => {
    alert("chua co chuc nang nay");
  }

  const handleClickLogo = () => {
    navigate('/');
  }
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
 

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          sx={{
            ml:-1
          }}
        >
          {/* <Box
            component="img"
            className="topbar-box-avatar"
            sx={{
              height: 40,
              width: 40,
              maxHeight: { xs: 40, md: 40 },
              maxWidth: { xs: 40, md: 40 },
              borderRadius: 40,
            }}
            alt="The house from the offer."
            src={imageUrl}
          /> */}
          <Avatar alt="manh" src={imageUrl} />
        </IconButton>
        <p className='profile-mobile'>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, opacity: 0.9 ,height : 64,}} className="top-bar-root">
      <AppBar position="static" sx={{ backgroundColor: "#060412" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              // 'pointer-events': 'all',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={handleClickLogo}
          >
            Social Network
          </Typography>
          <Search sx={{ ml: "100px" }}>
            <SearchIconWrapper className="search-icon-wrapper">
              <SearchIcon onClick={handleSearch} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search >
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } , justifyContent: 'center',
                alignItems: 'center',}}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{
              width: 50,
              height: 50
            }}>
              <Badge
                badgeContent={4} color="error"
              >

                <MailIcon />

              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"

              sx={{                
                width: 50,
                height: 50
              }}
            >
              <Badge

                badgeContent={17} color="error"
              >

                <NotificationsIcon />

              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                  maxHeight: { xs: 40, md: 40 },
                  maxWidth: { xs: 40, md: 40 },
                  borderRadius: 40,
                }}
                alt="The house from the offer."
                src={imageUrl}
              /> */}
              <Avatar alt="manh" src={imageUrl} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Topbar;
