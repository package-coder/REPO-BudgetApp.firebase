import { useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap'
import AddExpensesModal from './AddExpensesModal';

import '../styles/budgetCardStyle.css'

export default function BudgetCard( { doc, constant=false, caption } ){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const data = doc.data();


    return (
        <>
            <Card className={`${constant && 'budgetCard-constant'} budgetCard`}>

                <Card.Header className="p-4">
                    <div className='d-flex justify-content-between align-items-start gap-1'>
                        <Card.Title as="span" className='m-0 fw-bold'>{data.budgetName}</Card.Title>
                        <span className='card-option d-flex flex-column'>
                            <Button onClick={handleShow}><i class="bi bi-plus-lg"></i></Button>
                            <Button variant="secondary"><i class="bi bi-info-lg"></i></Button>
                        </span>
                    </div>
                    <section className='constant-hidden'>Last Expend Date:{' '}{data && data.lastExpendDate}</section>
                </Card.Header>
                <Card.Body className="p-4 pt-3">
                    <div className='d-flex justify-content-between align-items-end'>
                        <span>{constant ? caption : 'Expenses Progress'}</span>
                        <span className="d-flex justify-content-end align-items-center fs-6" >
                            <span className='fs-5 budgetCard-currentExpenses' >{data.currentExpenses}</span>
                            {' '}/{' '}
                            <span >{data.maxExpenses}</span>
                        </span>
                    </div>
                    <ProgressBar now={data.currentExpenses} max={parseInt(data.maxExpenses)} variant={getProgressBarVariant(data.currentExpenses, data.maxExpenses)} />
                
                </Card.Body>
            </Card>
            <AddExpensesModal show={show} onHide={handleClose} docData={data} docId={doc.id}  />
        </>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio <= 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}