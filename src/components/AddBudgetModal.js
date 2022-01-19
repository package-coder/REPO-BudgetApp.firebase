import { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { app } from '../firebase'
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 




export default function AddBudgetModal( props ) {
  
    const budgetNameRef = useRef();
    const maxExpensesRef = useRef();
    const currentExpensesRef = useRef();
    const descriptionRef = useRef();

    const [validated, setValidated] = useState(false);

    const { uid, photoURL } = getAuth().currentUser;

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation(); 
            setValidated(true);
            return;
        }

        setValidated(false);

        props.onHide();
        event.preventDefault();

        try {
            const data = {
                budgetName: budgetNameRef.current.value,
                maxExpenses: Number(maxExpensesRef.current.value),
                currentExpenses: Number(currentExpensesRef.current.value),
                description: descriptionRef.current.value,
                createdAt: serverTimestamp(),
                uid,
            }

            addDoc(collection(db, "budgets"), data);
            console.log("Data: ", data);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };


    return (
        <Modal  {...props} >
            <Modal.Header closeButton className='bg-light'>
                <Modal.Title>Add Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-3">
            <Form className='vstack gap-3' noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Budget Name</Form.Label>
                    <Form.Control ref={budgetNameRef} type="text" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Maximum Expenses</Form.Label>
                    <Form.Control ref={maxExpensesRef} type="number" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Current Expenses</Form.Label>
                    <Form.Control ref={currentExpensesRef} type="number" required readOnly value={0}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className='text-end mt-3'>
                    <Button type="submit" size="sm">
                        Save Changes
                    </Button>
                </Form.Group>
            </Form>
            </Modal.Body>
        </Modal>
  );
}
