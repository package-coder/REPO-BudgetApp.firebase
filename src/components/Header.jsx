import { Container, Stack, Button } from "react-bootstrap";
import useModalHandler from "../hooks/useModalHandler";
import AddBudgetModal from "./modals/AddBudgetModal";
import '../styles/Header.css'

function Header(){
  const [show, handleShow, handleClose] = useModalHandler(false);


    return (
        <>
            <Container>
                <header className="budgets-header py-5 mb-5 d-flex justify-content-between align-items-center">
                    <h1 className='budgets-heading'>Budget App {' '} </h1>
                    <Stack direction='horizontal' className='gap-2'>
                        <Button onClick={handleShow} ><i class="bi bi-plus-lg"></i>{' '}Add Budget</Button>
                    </Stack>
                </header>
            </Container>
            <AddBudgetModal show={show} onHide={handleClose} />
        </>
    )
}

export default Header;