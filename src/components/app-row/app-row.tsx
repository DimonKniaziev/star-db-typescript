import React from "react";
import "./app-row.scss"

interface IAppRow {
    left: React.ReactNode;
    right: React.ReactNode;
}

const AppRow: React.FC<IAppRow> = ({ left, right }) => {
    return (
        <div className="app-row">
            {left}
            {right}
        </div>
    );
}

export default AppRow;