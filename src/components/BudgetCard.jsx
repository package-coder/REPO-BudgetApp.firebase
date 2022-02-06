import { Card, ProgressBar, Button } from 'react-bootstrap'
import AddExpensesModal from './modals/AddExpensesModal';
import useDisplay from '../hooks/useShow';

import '../styles/BudgetCard.css'


export default function BudgetCard( 
        { 
            budgetName, 
            current, 
            max, 
            lastExpendDate, 
            passive='',
            passiveControls='',
            passiveCaption,
            docId
        } 
    ){


    const { show, handleClose, handleShow } = useDisplay(false);


    return (
        <>
            <Card className={`${passive && 'budgetCard-passive '}budgetCard`}>
                <Card.Header className="p-4">
                    <Card.Title as="span" className='m-0 fw-bold'>{budgetName}</Card.Title>
                    <section className='passive-hide'>Last Expend Date:{' '}{lastExpendDate}</section>
                </Card.Header>
                
                <Card.Body className="p-4 pt-3">
                    <div className='d-flex justify-content-between align-items-end'>
                        <span>{ passiveCaption ? passiveCaption : 'Expenses Progress' }</span>
                        <span className="d-flex justify-content-end align-items-center fs-6" >
                            <span className='fs-5 budgetCard-currentExpenses' >{current}</span>
                            {' '}/{' '}
                            <span >{max}</span>
                        </span>
                    </div>
                    <ProgressBar now={current} max={parseInt(max)} variant={getProgressBarVariant(current, max)} />
                </Card.Body>
                <span className={`${passiveControls && 'passive-controls '}card-controls d-flex flex-column`}>
                    <Button onClick={handleShow}><i class="bi bi-plus-lg"></i></Button>
                    <Button variant="secondary"><i class="bi bi-info-lg"></i></Button>
                </span>
            </Card>
            <AddExpensesModal 
                show={show} 
                onHide={handleClose} 
                budgetName={budgetName} 
                docId={docId}
            />
        </>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio <= 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}