import { useEffect, useState } from "react";
import "./App.css";
import Qsection from "./components/Qsection";
import Asection from "./components/Asection";
import SubmitTopic from "./components/SubmitTopic";
import TopicQ from "./components/topicQ";
function App() {
  const [topics, setTopics] = useState("");
  const [topicQ, setTopicQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [topicA, setTopicA] = useState("");
  const apiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;




  const handleSubmitTopic = async () => {
    console.log(topics);
    const payload = {
      contents: [
        {
          parts: [{ text: "Give me Questions On the Topic of " + topics + "Also in the response dont use symbols like (#,*) but give the answer in markdown format" }],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    const content = data.candidates[0].content.parts[0].text;
    console.log(content);
    setTopicQ(content);

  };
  const handleSubmitAns = async () => {
    console.log(answer);
    const payload = {
      contents: [
        {
          parts: [
            { text: "I had a question on the topic of " + topicQ + " and my answer was " + answer + " given as this, check if the answer is correct if there is any mistake correct it and give the answer with the misaks mentioned also in the end give a score out of 100 in the end" }
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const Ansdata = await response.json();
    console.log(Ansdata);
    const CorrectedAns = Ansdata.candidates[0].content.parts[0].text;
    console.log(CorrectedAns);
    setTopicA(CorrectedAns);

  }

  return (
    <div className="App">
      <div className="nav"> Q & A</div>
      <section></section>

      <div className="container">
        <div className="input-container">
          <Qsection topics={topics} setTopics={setTopics} />
          <SubmitTopic handleSubmitTopic={handleSubmitTopic} />
          <TopicQ topicQ={topicQ} />
          <Asection ans={answer} setAns={setAnswer} />
          <button className="submit" onClick={handleSubmitAns}>Submit Answer & Check Your Answer</button>
          <TopicQ topicQ={topicA} />
        </div>
      </div>
    </div>
  );
}

export default App;