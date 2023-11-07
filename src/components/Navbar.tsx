import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Search } from "@mui/icons-material";
import avatar from "../assets/avatar.svg";
import flag from "../assets/flag.svg";
import Header from "./Header";
const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={10} position="static" sx={{bgcolor:"rgb(22,27,37)"}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Search />
            </IconButton>

            <Typography
              variant="h6"
              component="span"
              sx={{ flexGrow: 1 }}
            ></Typography>

            <IconButton
              disableRipple
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={flag} alt="flag" style={{ width: "28px" }} />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img
                src={avatar}
                alt="avatar"
                style={{ width: "30px", borderRadius: "50%" }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Header />
    </>
  );
};
export default Navbar;
