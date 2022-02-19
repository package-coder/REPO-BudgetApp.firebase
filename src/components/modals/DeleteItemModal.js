import React from 'react'
import { useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import { Modal, Button, Stack } from 'react-bootstrap';
import '../../styles/Modals.css'


function DeleteItemModal({ show, onHide, budgetName, docId }) {
    const { deleteBudget } = useContext(BudgetContext);

    function handleDeleteItem(){
        onHide();
        deleteBudget(docId);
    }

  return (
    <Modal className="deleteModal" show={show} onHide={onHide} centered>
        <Modal.Body className="m-4">
            <div className='mb-3'>Do you want to delete this item <strong>{budgetName}</strong> ?</div>
            <Stack direction="horizontal" className="justify-content-end" gap={2}>
                <Button onClick={onHide} variant="secondary" size="sm">Cancel</Button>
                <Button onClick={handleDeleteItem} variant="danger" size="sm">Delete</Button>
            </Stack>
        </Modal.Body>
    </Modal>
  )
}

export default DeleteItemModal