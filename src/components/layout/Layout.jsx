import React, { useState } from "react";
import Header, { idHeader } from "./header/Header";
import Menu, { idMenu } from "./menu";
import Footer, { idFooter } from "./footer/Footer";
import { Link, Outlet } from "react-router-dom";
import { Observer } from "./Observer";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import "./layoutStyles.css"

export function fullScreen(activate = false) {
  if (activate) {
    document.getElementById(idHeader).style.display = "none";
    document.getElementById(idMenu).style.display = "none";
    document.getElementById(idFooter).style.display = "none";
  } else {
    document.getElementById(idHeader).style.display = "inline";
    document.getElementById(idMenu).style.display = "inline";
    document.getElementById(idFooter).style.display = "inline";
  }
}

const Layout = () => {
  const [open, setOpen] = useState(true);
  const isHome =
    window.location.pathname === "/home" || window.location.pathname === "/";

  const cookiePolicy = document.cookie.replace(
    /(?:(?:^|.*;\s*)cookiePolicy\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const setCookiePolicy = (isAccept) => {
    document.cookie = `cookiePolicy=${isAccept ? "true" : "false"}`;
    setOpen(false);
  };

  //console.log(cookiePolicy,  (cookiePolicy !== "true" || cookiePolicy !== "false"));

  return (
    <div className={'layout'}>
      <Observer />
      <Header isHome={isHome} />
      <Menu />
      <div style={{ minHeight: "75vh", position: "relative" }}>
        <Outlet />
      </div>
      <Footer />
      {(cookiePolicy !== "true" || cookiePolicy !== "false") && (
        <Snackbar
          open={open && !(cookiePolicy === "true" || cookiePolicy === "false")}
            sx={{
                width: "100%",
            }}
        >
          <Alert
            severity="info"
            sx={{ width: "100%" }}
            action={
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  onClick={() => {
                    setCookiePolicy(true);
                  }}
                >
                  accept
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => {
                    setCookiePolicy(false);
                  }}
                >
                  reject
                </Button>
              </>
            }
          >
            <AlertTitle>We use cookies</AlertTitle>
            We use cookies to enhance your browsing experience on our website,
            to display personalized content, and to analyze traffic on our
            website. 
           <Link to={"/manual/help/cookiePolicy"} >See the cookie policy.</Link> 
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Layout;
