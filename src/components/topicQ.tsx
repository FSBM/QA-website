import React from "react";


interface Props {
        topicQ: string;
    }


const TopicQ: React.FC<Props> = ({topicQ}) => {
    if(topicQ === ""){
        return <div></div>
    }
        
    return <div className="topicQ formatted-text w-full">
        <h2>
            {topicQ}
        </h2>
    </div>;
}

export default TopicQ;
