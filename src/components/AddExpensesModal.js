import { useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { db } from '../firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore"; 
import { useDocument } from 'react-firebase-hooks/firestore';

export default function AddExpensesModal({ show, onHide, docData }) {

    const expendRef = useRef();

    const [validated, setValidated] = useState(false);


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation(); 
            setValidated(true);
            return;
        }

        setValidated(false);

        onHide();
        event.preventDefault();

        const ref = doc(db, "budgets", docData.id);
        getDoc(ref).then(res => {
            const expend = res.data().currentExpenses;
            console.log(expend)
            updateDoc(ref, {
                "currentExpenses": expend + Number(expendRef.current.value)
            });
            
        });
    
       
    };


    const data = docData.data();

   return (

    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton className='bg-light'>
            <Modal.Title>Add Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-3">
        <Form className='vstack gap-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Budget Name</Form.Label>
                <Form.Control type="text" readOnly value={data && data.budgetName}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Add Expend</Form.Label>
                <Form.Control ref={expendRef} type="number" required />
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
