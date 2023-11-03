import React, { useState } from "react";
import ErrorIndicator from "../error-indicator/error-idicator";

interface IErrorBoundry {
    children: React.ReactNode;
};

const ErrorBoundry: React.FC<IErrorBoundry> = ({children}) => {    
    try {
        return children as JSX.Element;
    }
    catch(error){
        return <ErrorIndicator/>
    }
}

export default ErrorBoundry;