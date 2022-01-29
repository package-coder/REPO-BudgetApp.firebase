import React from 'react'
import { useState } from 'react';

import BudgetCard from './BudgetCard'
import AddBudgetModal from './AddBudgetModal';
import LoadingPage from './LoadingPage';
import SignOut from './SignOut';
import '../styles/budgetsStyle.css';

import { Container, Button, Alert, Stack } from 'react-bootstrap'

import { app, db } from '../firebase'
import { collection } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { useCollection } from "react-firebase-hooks/firestore"



export default function Budgets() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { uid } = getAuth().currentUser;

  const [value, loading, error] = useCollection(
    collection(db, "users", uid, "budgets"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    })


  return (
    <>
      <Container className="budgets">
        <header className="budgets-header my-5 mb-5 d-flex justify-content-between align-items-center">
          <h1 className='budgets-heading'>Budget App {' '} </h1>
          <Stack direction='horizontal' className='gap-2'>
            <Button onClick={handleShow} ><i class="bi bi-plus-lg"></i>{' '}Add Budget</Button>
            <SignOut />
          </Stack>
        </header>
        <div className="d-flex flex-column flex-md-row gap-4 flex-wrap justify-content-start">
          <BudgetCard doc={() => { budgetName: "Total Budget", currentExpenses: 200, maxExpenses: 300}} constant caption={'Total Expenses'} />
          {
            value && value.docs.length !== 0 ?
              value.docs.map((doc) => (
                <BudgetCard doc={doc} key={doc.id} constant={doc.data().constant} />
              ))
              : loading ? <LoadingPage />
                : error ? <div>{error}</div>
                  : <Alert className='text-center' variant="info">No records were found.</Alert>
          }
        </div>

      </Container>
      <AddBudgetModal show={show} onHide={handleClose} />
    </>
  )
}
