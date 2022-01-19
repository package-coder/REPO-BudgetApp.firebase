import { useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap'
import AddExpensesModal from './AddExpensesModal';

import '../styles/budgetCardStyle.css'

export default function BudgetCard( { doc } ){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const data = doc.data();
    return (
        <>
            <Card className="budgetCard">
                <Card.Header className="p-4">
                    <div className='mb-3 d-flex justify-content-between align-items-start gap-1'>
                        <Card.Title as="span" className='m-0'>{data.budgetName}</Card.Title>
                        <span className='card-option d-flex gap-1'>
                            <Button onClick={handleShow}><i class="bi bi-plus-lg"></i>{' '}Add Expenses</Button>
                            <Button variant="secondary"><i class="bi bi-info-lg"></i></Button>
                        </span>
                    </div>
                    <section><strong>Last Expend Date:{' '}{data && data.lastExpendDate}</strong></section>
                </Card.Header>
                <Card.Body className="p-4 pt-3">
                    <div className='d-flex justify-content-between align-items-end'>
                        <span><strong>Expenses Progress</strong></span>
                        <span className="d-flex justify-content-end align-items-center fs-6" >
                            <span className='fs-5' ><strong>{data.currentExpenses}</strong></span>
                            {' '}/{' '}
                            <span >{data.maxExpenses}</span>
                        </span>
                    </div>
                    <ProgressBar  className="rounded-pill" now={data.currentExpenses} max={parseInt(data.maxExpenses)} />
                
                </Card.Body>
            </Card>
            <AddExpensesModal show={show} onHide={handleClose} docData={doc}  />
        </>
    )
}