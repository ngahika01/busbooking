import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@emotion/react";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const pages = ["Products", "Pricing", "Blog"];

const NavBar = () => {
  const { palette } = useTheme();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <AppBar   position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              navigate("/home");
            }}
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          >
            Bus Booking System
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/home");
                  }}
                  variant="subtitle1"
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/about");
                  }}
                  variant="subtitle1"
                >
                  About
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/mybookings");
                  }}
                  variant="subtitle1"
                >
                  My bookings
                </Typography>
              </MenuItem>
              {userInfo && userInfo.isAdmin && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      onClick={() => {
                        navigate("/bookings");
                      }}
                      variant="subtitle1"
                    >
                      All bookings
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/buses");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography variant="subtitle1">Buses</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Bus Booking System
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              sx={{
                color: palette.primary.contrastText,
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                navigate("/mybookings");
              }}
              sx={{
                color: palette.primary.contrastText,
              }}
            >
              My Bookings
            </Button>
            <Button
              onClick={() => {
                navigate("/about");
              }}
              sx={{
                color: palette.primary.contrastText,
              }}
            >
              About
            </Button>
            {userInfo && userInfo.isAdmin && (
              <>
                <Button
                  onClick={() => {
                    navigate("/bookings");
                  }}
                  sx={{
                    color: palette.primary.contrastText,
                  }}
                >
                  Bookings
                </Button>
                <Button
                  onClick={() => {
                    navigate("/buses");
                  }}
                  sx={{
                    color: palette.primary.contrastText,
                  }}
                >
                  Buses
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                  toast("Logged out successfully!");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
