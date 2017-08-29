import React from 'react';

function ErrorMessage(props){
    return(
        <p className="errorMsg">{props.error}</p>
    )
}

export default ErrorMessage;