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
        <div className="input-box q-section flex justify-center items-center gap-2">

            <input
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="w-[40vw] p-3 bg-[#212121]" 
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