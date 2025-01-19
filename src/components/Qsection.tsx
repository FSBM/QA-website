import { useEffect, useState } from "react";
import React from "react";

interface Props {
    topics: string;
    setTopics: (value: string) => void;
}

const Qsection: React.FC<Props> = ({ topics, setTopics }) => {
    return (
        <div className="q-section">
            <h3>Type Your Topic Here</h3>
            <textarea
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="input-box"
                placeholder="Type Your Topic Here"
                name=""
                id=""
            />
        </div>
    );
}
export default Qsection;