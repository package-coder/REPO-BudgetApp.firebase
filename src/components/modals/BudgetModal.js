import React from 'react'
import { Modal, Stack, Button, ProgressBar } from 'react-bootstrap'

function BudgetModal(props) {
  const { 
    show, 
    onHide, 
    budgetName, 
    description, 
    docId, 
    max, 
    current, 
    progressVariant } = props;

  return (
    <Modal className="budgetModal" show={show} onHide={onHide} centered>
        <Modal.Header closeButton><strong>{budgetName}</strong></Modal.Header>
        <Modal.Body className="m-4">
            <Stack gap={2}>
                <span>Description: <span className='text-muted'>{description}</span></span>
                <ProgressBar variant={progressVariant} min={current} max={max} />
                <Button onClick={onHide} variant="secondary" size="sm">Cancel</Button>
                <Button variant="danger" size="sm">Delete</Button>
            </Stack>
        </Modal.Body>
    </Modal>
  )
}

export default BudgetModal