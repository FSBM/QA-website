import { useState, useEffect } from "react";
import Qsection from "./Qsection";
import React from "react";

interface Props {
    handleSubmitTopic: () => void;
}

const SubmitTopic: React.FC< Props > = ({ handleSubmitTopic }) => {
    return (
        <div className="submit-topic">
            <button
                className="submit"
                onClick={handleSubmitTopic}>
                Submit Topic
            </button>
        </div>
    );
}

export default SubmitTopic;