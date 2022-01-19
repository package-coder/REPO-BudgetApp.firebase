import React from 'react'
import { useState } from 'react';

import BudgetCard from './BudgetCard'
import AddBudgetModal from './AddBudgetModal';
import LoadingPage from './LoadingPage';

import { Container, Button, Alert } from 'react-bootstrap'

import { app, db } from '../firebase'
import { collection, doc, query, where } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { useCollection } from "react-firebase-hooks/firestore"



export default function Budgets() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { uid } = getAuth().currentUser;

  const [value, loading, error] = useCollection(
    query(collection(db, "budgets"), where("uid", "==", uid)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    })

    return (
      <>
        <Container className="home pt-5">
        <header className="mb-5 d-flex justify-content-between align-items-center">
          <h1 className='heading'>Budget App {' '} </h1>
          <Button onClick={handleShow} className='round-btn'>Add Budget</Button>
        </header>
        {  }
        <div className="d-flex flex-column flex-md-row gap-3 flex-wrap">
        {
          value && value.docs.length != 0 ? 
            value.docs.map((doc) => (
              <BudgetCard doc={doc} key={doc.id} />
            ))
          : loading ? <LoadingPage />
          : <Alert className='text-center' variant="info">No records were found.</Alert>
        }
        </div> 
        
        </Container>
        <AddBudgetModal show={show} onHide={handleClose} />
    </>
    )
}
