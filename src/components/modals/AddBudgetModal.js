import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';

import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 


function appendBudget(data){
    const { uid } = getAuth().currentUser;
    return addDoc(collection(db, "users", uid, "budgets"), data);
}

export default function AddBudgetModal( props ) {
  
    const [validated, setValidated] = useState(false);


    const handleSubmit = (e) => {

        e.preventDefault();

        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation(); 
            setValidated(true);
            return;
        }

        setValidated(false);
        props.onHide();

        const { name, 
            maxExpenses,
            currentExpenses, 
            description } = e.target;

        const data = {
            budgetName: name.value,
            maxExpenses: Number(maxExpenses.value),
            currentExpenses: Number(currentExpenses.value),
            description: description.value,
            createdAt: serverTimestamp(),
        }

        appendBudget(data);
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
                    <Form.Control type="text" name="name" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Maximum Expenses</Form.Label>
                    <Form.Control type="number" name="maxExpenses" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Current Expenses</Form.Label>
                    <Form.Control type="number" name="currentExpenses" required readOnly value={0}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={3} />
                </Form.Group>
                <Form.Group className='text-end mt-3'>
                    <Button type="submit" size="sm">
                        Add Budget
                    </Button>
                </Form.Group>
            </Form>
            </Modal.Body>
        </Modal>
  );
}
