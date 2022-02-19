import { useState } from "react";

export default function useModalHandler(initial) {
    const [show, setShow] = useState(initial);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return [show, handleShow, handleClose, setShow];
}
