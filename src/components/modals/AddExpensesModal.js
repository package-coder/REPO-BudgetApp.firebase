import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc, Timestamp, serverTimestamp } from "firebase/firestore"; 

function updateExpenses(docId, func, date){

    const { uid } = getAuth().currentUser;

    const ref = doc(db, "users", uid, "budgets", docId);

    getDoc(ref).then(res => {
        const currentValue = parseInt(res.data().currentExpenses);

        return updateDoc(ref, {
            "currentExpenses": func(currentValue),
            "lastExpendDate": date
        });

    }).catch(console.error);
}

export default function AddExpensesModal({ show, onHide, budgetName, docId }) {

    const options = { weekday: 'long', month: 'short', day: 'numeric' };

    const [validated, setValidated] = useState(false);


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
            (value) => Number(value) + Number(amount.value), 
            date.value
        )
    };

   return (

    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton className='bg-light'>
            <Modal.Title>{budgetName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-3">
        <Form className='vstack gap-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>New Expend Amount</Form.Label>
                <Form.Control type="number" name="amount" required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" readOnly value={Timestamp.now().toDate().toLocaleDateString("en-US", options)} />
            </Form.Group>
             <Form.Group className='text-end mt-3'>
                <Button type="submit" size="sm">
                    Add Expenses
                </Button>
            </Form.Group>
        </Form>
        </Modal.Body>
    </Modal>
    );
}
