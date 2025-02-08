import { useEffect, useState } from "react";
import "./App.css";
import Qsection from "./components/Qsection";
import Asection from "./components/Asection";
import SubmitTopic from "./components/SubmitTopic";
import TopicQ from "./components/topicQ";
import { DotLoader } from "react-spinners";
import QALanding from "./components/middleIntro";
import { MdCloseFullscreen } from "react-icons/md";


function App() {
  interface QandA {
    Qs: string;
    As: string;
  }

  

  const [topics, setTopics] = useState("");
  const [topicQ, setTopicQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [topicA, setTopicA] = useState("");
  const [topicDisplay, setTopicDisplay] = useState("block");
  const [ansDisplay, setAnsDisplay] = useState("block");
  const [QandAList, setQandAList] = useState<QandA[]>(() => {
    const savedHistory = localStorage.getItem("qaHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [SideOpen , setSideOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("qaHistory", JSON.stringify(QandAList));
  }, [QandAList]);

  

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
              text: `I had a question on the topic of ${topicQ} and my answer was ${answer}. First Provide the answer for the questions, then give score for my question in total out of 100. Return the response in plain text without markdown symbols.
              even if the response is is incorrect and does not address any of the five questions. It is nonsensical in this context Always provide the correct answer`

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
      <div className="nav bg-gray-800 bg-opacity-20"> Q & A</div>

      <div className="flex flex-col lg:flex-row h-[100vh] pt-10 overflow-hidden">
        {topicDisplay === "block" ? (
          <div className="flex flex-col w-full min-h-screen p-5 overflow-auto pb-[150px] items-center no-scrollbar">
            {topicQ==="" ? <QALanding /> :null }
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

        {SideOpen ?null : 
        <div className="rotate-180 fixed items-center align-middle right-5 top-[50%]">
        <button type="button" 
            onClick={()=>{setSideOpen(true)}} 
            className="text-white bg-[--secondary-violet-color] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-[--secondary-violet-color] dark:hover:bg-[--secondary-violet-color] dark:focus:ring-blue-800
            shadow-md shadow-indigo-500
            ">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span className="sr-only"></span>
            </button>
        </div>}
        {(SideOpen) && (
          <div className="flex flex-col pt-5 w-full lg:w-[50vw] min-h-screen border-[--border-color] border-l-[1px] overflow-auto">
            <div className="flex justify-between items-center p-5 border-b-gray-500 border-b-[1px]">
            <h1 className="text-1xl text-center font-normal font-mono">History</h1>
            <button><MdCloseFullscreen  size={20} fill="white" onClick={()=>{setSideOpen(false)}}/></button>
            </div>
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
