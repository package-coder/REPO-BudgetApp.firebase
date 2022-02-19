import { Card, ProgressBar, Button } from 'react-bootstrap'
import AddAmountModal from './modals/AddAmountModal';
import DeleteItemModal from './modals/DeleteItemModal';
import BudgetModal from './modals/BudgetModal'

import '../styles/BudgetCard.css'
import useModalHandler from '../hooks/useModalHandler';


export default function BudgetCard( 
        { 
            budgetName, 
            current, 
            max, 
            description,
            lastExpendDate, 
            passive='',
            passiveControls='',
            passiveCaption,
            docId
        } 
    ){
 

    const [showAmountModal, handleShowAmountModal, handleCloseAmountModal] = useModalHandler(false);
    const [showDeleteModal, handleShowDeleteModal, handleCloseDeleteModal] = useModalHandler(false);
    const [showBudgetModal, handleShowBudgetModal, handleCloseBudgetModal] = useModalHandler(false);

    
    function stopPropagation(handleOnClick){

        const onClickEvent = (e) => {
            e.stopPropagation();
            handleOnClick();
        }

        return onClickEvent;
    }

    return (
        <>
            <Card 
                className={`${passive && 'budgetCard-passive '}budgetCard`}
                onClick={!passive ? handleShowBudgetModal : null}
                >
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
                    <Button onClick={stopPropagation(handleShowAmountModal)}><i class="bi bi-plus-lg"/></Button>
                    <Button onClick={stopPropagation(handleShowBudgetModal)} variant="secondary"><i class="bi bi-info-lg" /></Button>
                    <Button onClick={stopPropagation(handleShowDeleteModal)} variant="danger"><i class="bi bi-trash"/></Button>
                </span>

            </Card>

            <AddAmountModal 
                show={showAmountModal} 
                onHide={handleCloseAmountModal} 
                budgetName={budgetName} 
                docId={docId}
            />
            <DeleteItemModal 
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                budgetName={budgetName}
                docId={docId}
            />
            <BudgetModal 
                show={showBudgetModal}
                onHide={handleCloseBudgetModal}
                budgetName={budgetName}
                description={description}
                current={current}
                max={max}
                docId={docId}
                progressVariant={getProgressBarVariant(current, max)}
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