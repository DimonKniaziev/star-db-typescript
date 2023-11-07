import React, { useState } from "react";
import "./error-button.scss"

interface IErrorButton {
    onError: () => void;
}

const ErrorButton: React.FC<IErrorButton> = ({onError}) => {
    const [renderError, setRenderError] = useState(false);
    
    if(renderError) {
        try {
            throw new Error();
        }
        catch {
            onError()
        }
    }

    return (
        <button className="error-button" onClick={() => setRenderError(true)}>
            Throw Error
        </button>
    );
}

export default ErrorButton;