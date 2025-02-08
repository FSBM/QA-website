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
  const [QandAList, setQandAList] = useState<QandA[]>(() => {
    const savedHistory = localStorage.getItem("qaHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [topicDisplay, setTopicDisplay] = useState("block");
  const [ansDisplay, setAnsDisplay] = useState("block");
  const [SideOpen, setSideOpen] = useState(false);


  useEffect(() => {
    localStorage.setItem("qaHistory", JSON.stringify(QandAList));
  }, [QandAList]);

  const handleSubmitTopic = async () => {
    if (!topics.trim()) {
      alert("Please enter a topic.");
      return;
    }
  
    setTopicDisplay("none");
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topics }),
      });
  
      if (!response.ok) throw new Error("Failed to fetch questions");
  
      const data = await response.json();
      setTopicQ(data.questions || "No questions found");
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setTopicDisplay("block");
    }
  };

  // const handleSubmitAns = async () => {
  
  //   if (!answer.trim()) {
  //     alert("Please enter an answer.");
  //     return;
  //   }
  
  //   setAnsDisplay("none");
  
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submit-answer`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ topicQ, answer }),
  //     });
  
  //     if (!response.ok) throw new Error("Failed to submit answer");
  
  //     const Ansdata = await response.json();
  //     setQandAList([...QandAList, { Qs: topicQ, As: Ansdata.correctedAnswer }]);
  //     setTopicA(Ansdata.correctedAnswer);
  //   } catch (error) {
  //     console.error("Error submitting answer:", error);
  //     alert("Something went wrong. Please try again.");
  //   } finally {
  //     setAnsDisplay("block");
  //   }
  // };




  const handleSubmitAns = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer.");
      return;
    }
  
    setAnsDisplay("none");
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submit-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicQ, answer }),
      });

      if (!response.ok) throw new Error("Failed to submit answer");

      const Ansdata = await response.json();
      
      // Update state (which triggers localStorage save)
      setQandAList(prev => [...prev, { Qs: topicQ, As: Ansdata.correctedAnswer }]);
      setTopicA(Ansdata.correctedAnswer);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setAnsDisplay("block");
    }
  };

  return (
    <div className="App">
      <div className="nav bg-gray-800 bg-opacity-20"> Q & A</div>

      <div className="flex flex-col lg:flex-row h-[100vh] pt-10 overflow-hidden">
        {topicDisplay === "block" ? (
          <div className="flex flex-col w-full min-h-screen p-5 overflow-auto pb-[150px] items-center no-scrollbar">
            {topicQ === "" ? <QALanding /> : null}
            <div className="relative lg:fixed bottom-5 flex items-end gap-1 z-50">
              <Qsection topics={topics} setTopics={setTopics} displayProp={topicDisplay}>
                <SubmitTopic handleSubmitTopic={handleSubmitTopic} />
              </Qsection>
            </div>
            <TopicQ topicQ={topicQ} />

            {ansDisplay === "none" && <div className="h-[300px] flex justify-center items-center"><DotLoader color="#4f45e4" /></div>}

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

        {!SideOpen && (
          <div className="rotate-180 fixed items-center align-middle right-5 top-[50%]">
            <button
              type="button"
              onClick={() => setSideOpen(true)}
              className="text-white bg-[--secondary-violet-color] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center shadow-md shadow-indigo-500"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        )}

        {SideOpen && (
          <div className="flex flex-col pt-5 w-full lg:w-[50vw] min-h-screen border-[--border-color] border-l-[1px] overflow-auto">
            <div className="flex justify-between items-center p-5 border-b-gray-500 border-b-[1px]">
              <h1 className="text-1xl text-center font-normal font-mono">History</h1>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <MdCloseFullscreen size={20} fill="white" onClick={() => setSideOpen(false)} />
              </button>
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