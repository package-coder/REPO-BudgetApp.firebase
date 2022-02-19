import React from 'react'
import '../styles/LoadingComponent.css'

function LoadingComponent() {

    function handleClick(e){
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div className='loading-component' onClick={handleClick}>
            <div className="d-flex justify-content-center align-items-center w-100 h-100" variant="dark" >
                <span class="spinner-border" role="status" >
                <span class="visually-hidden">Loading...</span></span>
            </div>
        </div>
    )
}

export default LoadingComponent