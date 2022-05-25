import React, { useContext } from 'react';
import Layout from '../components/Layout'
import { Link } from 'gatsby';
import { Col, Row, Container } from 'react-bootstrap';

const PlaylistsPage = () => {
  return (
    <Layout currentPageName="Playlists" windowTitle="Playlists">
      <Container fluid>
        <h2>welcome to the playlists page</h2>
      </Container>
    </Layout>
  )
}

// Step 3: Export your component
export default PlaylistsPage;