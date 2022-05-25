import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import NavBar from "./nav/Navbar";
import { pageStyle } from "./Layout.module.css";
import "./global.css";

const Layout = ({ currentPageName, windowTitle, children }) => {
  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <meta name="viewport" content="width=device-width"></meta>
        <title>{windowTitle}</title>
      </Helmet>
      <main className={pageStyle}>
        <NavBar currentPageName={currentPageName} />
        <FormControl
          placeholder="Token here"
          onChange={(e) =>
            sessionStorage.setItem("access_token", e.target.value)
          }
        />
        <Container fluid>{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
