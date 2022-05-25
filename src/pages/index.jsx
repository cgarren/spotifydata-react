import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import { Col, Row, Container } from "react-bootstrap";

const IndexPage = () => {
  return (
    <Layout currentPageName="Home" windowTitle="Home">
      <Container fluid>
        <h2>hello</h2>
      </Container>
    </Layout>
  );
};

// Step 3: Export your component
export default IndexPage;
