import { useEffect, useState } from "react";
import "./App.css";
import Qsection from "./components/Qsection";
import Asection from "./components/Asection";
import SubmitTopic from "./components/SubmitTopic";
import TopicQ from "./components/topicQ";
import { DotLoader } from "react-spinners";
import Button from "./components/button";
import { DiVim } from "react-icons/di";

function App() {
  interface QandA {
    Qs: string;
    As: string;
  }

  const [topics, setTopics] = useState("");
  const [topicQ, setTopicQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [topicA, setTopicA] = useState("");
  const [QandA, setQandA] = useState<QandA>({ Qs: "", As: "" });
  const [topicDisplay, setTopicDisplay] = useState("block");
  const [ansDisplay, setAnsDisplay] = useState("block");
  const [QandAList, setQandAList] = useState<QandA[]>([]);

  const apiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const handleSubmitTopic = async () => {
    setTopicDisplay("none");
    console.log(topics);
    const payload = {
      contents: [
        {
          parts: [
            {
              text: "Give me around 5 Questions On the Topic of " +
                topics +
                " Also, return the response in plain text with numbering but without markdown symbols like (#, *, -)."
            }
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    const content = data.candidates[0].content.parts[0].text;
    console.log(content);
    setTopicQ(content);
    setTopicDisplay("block");
  };

  const handleSubmitAns = async () => {
    setAnsDisplay("none");
    console.log(answer);
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `I had a question on the topic of ${topicQ} and my answer was ${answer}. Check if the answer is correct, correct any mistakes, provide the corrected answer with marks mentioned, and give a final score out of 100. Return the response in plain text without markdown symbols.`
            }
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const Ansdata = await response.json();
    console.log(Ansdata);
    const CorrectedAns = Ansdata.candidates[0].content.parts[0].text;
    console.log(CorrectedAns);
    setQandAList([...QandAList, { Qs: topicQ, As: CorrectedAns }]);
    setAnsDisplay("block");
    setTopicA(CorrectedAns);
  };

  return (
    <div className="App">
      <div className="nav"> Q & A</div>

      <div className="flex flex-col lg:flex-row h-screen mt-16 overflow-auto">
        {topicDisplay === "block" ? (
          <div className="flex flex-col w-full min-h-screen p-5 overflow-auto pb-[150px] items-center">
            <div className="relative lg:fixed bottom-5 flex items-end gap-1 z-50">
              <Qsection topics={topics} setTopics={setTopics} displayProp={topicDisplay}>
                <SubmitTopic handleSubmitTopic={handleSubmitTopic} />
              </Qsection>
            </div>
            <TopicQ topicQ={topicQ} />

            {ansDisplay === "none" && <div className="h-[300px] flex justify-center items-center"> <DotLoader color="#4f45e4" /></div> }
            {topicQ && (
              <div className="flex flex-col gap-5 p-5 justify-center items-center">
                <Asection ans={answer} setAns={setAnswer} displayProp={ansDisplay} />
                <button className="submit" onClick={handleSubmitAns}>
                  Submit Answer & Check Your Answer
                </button>
              </div>
            )}
            <TopicQ topicQ={topicA} />
          </div>
        ) : (
          <div className="h-[400px] w-full flex justify-center items-center">
            <DotLoader color="#4f45e4" />
          </div>
        )}

        {QandAList.length > 0 && (
          <div className="flex flex-col w-full lg:w-[50vw] min-h-screen border-[--border-color] border-l-[1px] overflow-auto">
            {QandAList.map((QandA, index) => (
              <div key={index} className="flex flex-col p-6 border-[--border-color] border-b-[1px]">
                <div className="flex flex-col">
                  <div className="flex gap-1 font-medium">
                    <p>{index + 1}.</p>
                    <h1>Topic Question</h1>
                  </div>
                  <p className="formatted-text">{QandA.Qs}</p>
                  <h1>Evaluation</h1>
                  <p className="formatted-text">{QandA.As}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
