import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { auth, getCurrentUserId } from '../../firebase';
import { Timestamp } from "firebase/firestore"; 
import '../../styles/Modals.css'
import { BudgetContext } from '../../context/BudgetContext';
import useBudgetsDocument from '../../hooks/useBudgetsDocument';
import LoadingComponent from '../LoadingComponent';


export default function AddAmountModal({ show, onHide, budgetName, docId }) {

    const [budget, loading, error] = useBudgetsDocument(getCurrentUserId(), docId);

    const options = { weekday: 'long', month: 'short', day: 'numeric' };

    const [validated, setValidated] = useState(false);
    const { updateExpenses } = useContext(BudgetContext);

    function handleSubmit(e) {
        e.preventDefault();

        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation(); 
            setValidated(true);
            return;
        }


        setValidated(false);
        onHide();

        const { amount, date } = e.target;

        updateExpenses(
            docId, 
            (currentValue) => currentValue + Number(amount.value), 
            date.value
        )
    };

    //if(loading) return <LoadingPage />

   return (

    <Modal className='amountModal' show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <LoadingComponent />
        
        <Modal.Header closeButton>
            <Modal.Title><strong>{budgetName}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-3">
        <Form className='vstack gap-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" name="amount" required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" readOnly value={Timestamp.now().toDate().toLocaleDateString("en-US", options)} />
            </Form.Group>
             <Form.Group className='text-end mt-3'>
                <Button type="submit" size="sm">
                    Add Amount
                </Button>
            </Form.Group>
        </Form>
        </Modal.Body>
    </Modal>
    );
}
