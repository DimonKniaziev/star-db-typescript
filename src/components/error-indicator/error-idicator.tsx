import React from "react";
import './error-indicator.scss';

const ErrorIndicator: React.FC = () => {
    return (
        <div className="error-indicator">
            <h4>
                BOOM!
            </h4>
            <span>
                something has gone terribly
            </span>
            <br/>
            <span>
                (but we already sent drons to fix it)
            </span>
        </div>
    );
};

export default ErrorIndicator;