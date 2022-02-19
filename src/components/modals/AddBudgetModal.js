import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { serverTimestamp } from "firebase/firestore"; 
import '../../styles/Modals.css'
import { BudgetContext } from '../../context/BudgetContext';


export default function AddBudgetModal( props ) {
  
    const [validated, setValidated] = useState(false);
    const { addBudget } = useContext(BudgetContext)

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
            name: name.value,
            max: Number(maxExpenses.value),
            current: Number(currentExpenses.value),
            description: description.value,
            createdAt: serverTimestamp(),
        }

        addBudget(data);
    };


    return (
        <Modal className='budgetModal' {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title><strong>Add Budget</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-3">
            <Form className='vstack gap-3' noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Budget Name</Form.Label>
                    <Form.Control type="text" name="name" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Maximum Expenses</Form.Label>
                    <Form.Control type="number" name="maxExpenses" required min={1}/>
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
