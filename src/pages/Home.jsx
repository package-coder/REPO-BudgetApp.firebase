import React from 'react';
import { Container } from 'react-bootstrap';
import Budgets from '../components/Budgets';
import Header from '../components/Header';

function Home() {

  return (
    <>
      <Header />
      <Container>
        <Budgets />
      </Container>
    </>
  )
}

export default Home;
