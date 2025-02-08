import { Children, useEffect, useState } from "react";
import React from "react";

interface Props {
    topics: string;
    setTopics: (value: string) => void;
    displayProp:string;
    children?: React.ReactNode;
}

const Qsection: React.FC<Props> = ({ topics, setTopics, displayProp,children }) => {
    return (
        <div className="q-section flex justify-center items-center gap-2
        w-full px-1 py-2 rounded-full bg-gray-800 bg-opacity-60 backdrop-blur-xl text-white border border-gray-700 focus:outline-none focus:border-blue-500
        ">

            <input
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="w-[40vw] bg-transparent pl-2 " 
                style={{display:displayProp}}
                placeholder="Type Your Topic Here"
                name=""
                id=""

            />
            <span>
                {children}
            </span>
            
            
        </div>
    );
}
export default Qsection;