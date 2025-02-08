import { useState, useEffect } from "react";
import Qsection from "./Qsection";
import React from "react";
import Button from "./button";

interface Props {
    handleSubmitTopic: () => Promise<void>;
}

const SubmitTopic: React.FC<Props> = ({ handleSubmitTopic }) => {
    return (
        <div className="submit-topic">
            <button type="button" 
            onClick={handleSubmitTopic} 
            className="text-white bg-[--secondary-violet-color] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-[--secondary-violet-color] dark:hover:bg-[--secondary-violet-color] dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span className="sr-only"></span>
            </button>
        </div>
    );
}

export default SubmitTopic;