import React, { Fragment } from "react";
export default function LoadingSpinner() {
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </Fragment>

    );
}
