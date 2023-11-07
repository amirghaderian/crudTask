import { AppBar, Box, Toolbar, Typography } from "@mui/material";
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" sx={{bgcolor:"rgb(22,27,37)"}}>
        <Toolbar>
          <Typography
            sx={{ mr: "230px" }}
            color="inherit"
            component="span"
            variant="h6"
            width="900px"
          >
            <span> حساب کاربری</span>
          </Typography>
        </Toolbar>
       
          <Typography
            sx={{ mr: "230px",pr:"24px",pl:"24px" }}
            color="inherit"
            component="span"
            variant="subtitle1"
          >
            <span>خانه &sdot;	</span>
            <span>کاربر &sdot;	</span>
            <span>تنظیمات کاربری</span>
          </Typography>
        
      </AppBar>
    </Box>
  );
};
export default Header;
