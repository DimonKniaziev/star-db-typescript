import React, { useState } from "react";

const ErrorButton = () => {
    const [renderError, setRenderError] = useState(false);
    
    if(renderError) {
        throw new Error("You throwed ERROR");
    }

    return (
        <button onClick={() => setRenderError(true)}>
            Throw Error
        </button>
    );
}

export default ErrorButton;