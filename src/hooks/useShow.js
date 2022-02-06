import { useState } from "react";

export default function useShow(initial) {
    const [show, setShow] = useState(initial);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return {show, setShow, handleClose, handleShow};
}
