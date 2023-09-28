import React, { useState,useEffect } from "react";
import Generator from "../Components/Generator.jsx";
import { DataState } from "../Context/DataProvider.js";
import { useNavigate } from "react-router-dom";

const Question = () => {



  const [seconds, setSeconds] = useState(60);
  const [timerExpired, setTimerExpired] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        // Timer has expired
        setTimerExpired(true);
        clearInterval(timer);
        timeExpCall();
      } else {
        // Decrease the timer by 1 second
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    // Cleanup the timer interval when the component unmounts
    return () => clearInterval(timer);
  }, [seconds]);

  async function timeExpCall(){
      setConRight(0);
      setConWrong(0);
      if (curntDiff === 0) {
        setTotalEasy(totalEasy + 1);
      } else if (curntDiff === 1) {
        setTotalMedium(totalMedium + 1);
      } else if (curntDiff === 2) {
        setTotalHard(totalHard + 1);
      }
    setTotalCount(totalCount - 1);
    setLocAns("");
   
    if (curntDiff > 0) {
      setCurntDiff(curntDiff - 1);
    } 
    if (totalCount !== 0) {
      await fetchData();
      setSeconds(60);
      setTimerExpired(false);
      navigate("/question");

    } else {
      navigate("/result");
    }
  }

  // function addDataToCsv() {
    
  // }






  const [locAns, setLocAns] = useState("");
  const difLvl = ["Easy", "Medium", "Hard"];
  const {
    totalCount,
    setTotalCount,
    totalRight,
    setTotalRight,
    topic,
    // setTopic,
    curntDiff,
    setCurntDiff,
    conRight,
    setConRight,
    conWrong,
    setConWrong,
    totalEasy,
    setTotalEasy,
    correctEasy,
    setCorrectEasy,
    totalMedium,
    setTotalMedium,
    correctMedium,
    setCorrectMedium,
    totalHard,
    setTotalHard,
    correctHard,
    setCorrectHard,
    question,
    setQuestion,
    answer,
    setAnswer,
    optionA,
    setOptionA,
    optionB,
    setOptionB,
    optionC,
    setOptionC,
    optionD,
    setOptionD,
    csvData, 
    setCsvData
  } = DataState();

  const navigate = useNavigate();

  async function fetchData() {
    setLoading(true);
    try {
      const generatedJson = await Generator(difLvl[curntDiff], topic);
      setQuestion(generatedJson.Question);
      setOptionA(generatedJson["Option 1"]);
      setOptionB(generatedJson["Option 2"]);
      setOptionC(generatedJson["Option 3"]);
      setOptionD(generatedJson["Option 4"]);
      setAnswer(generatedJson.Answer);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSubmit() {
    console.log(`ME ${totalCount} va QUESTION HU!!!`);
    console.log(locAns);
      console.log(answer);
    if (locAns == "") {
      alert("Please Select An option");
    } else if (locAns == answer) {
      console.log("ME SAHI HU!!!!!!");
      
      setConRight(conRight + 1);
      setConWrong(0);
      setTotalRight(totalRight + 1);
      if (curntDiff === 0) {
        setTotalEasy(totalEasy + 1);
        setCorrectEasy(correctEasy + 1);
      } else if (curntDiff === 1) {
        setTotalMedium(totalMedium + 1);
        setCorrectMedium(correctMedium + 1);
      } else if (curntDiff === 2) {
        setTotalHard(totalHard + 1);
        setCorrectHard(correctHard + 1);
      }
    } else {
      console.log("ME GALAT HU!!!!!!");
      setConRight(0);
      setConWrong(conWrong + 1);
      if (curntDiff === 0) {
        setTotalEasy(totalEasy + 1);
      } else if (curntDiff === 1) {
        setTotalMedium(totalMedium + 1);
      } else if (curntDiff === 2) {
        setTotalHard(totalHard + 1);
      }
    }


    setCsvData(csvData.concat(`${question},${optionA},${optionB},${optionC},${optionD},${answer},${locAns},${60-seconds},${curntDiff}\n`));
    console.log(csvData);

    setTotalCount(totalCount - 1);
    setLocAns("");
    //predict next difficulty
    if (conRight >= 2 && curntDiff < 2) {
      setCurntDiff(curntDiff + 1);
    } else if (conWrong >= 2 && curntDiff > 0) {
      setCurntDiff(curntDiff - 1);
    }

    if (totalCount !== 0) {
      await fetchData();
      setSeconds(60);
      setTimerExpired(false);
    setLoading(false);
      navigate("/question");
    } else {
    setLoading(false);
      navigate("/result");
    }
  }

  return (
    // {/* { loading ? () : ()}
    <div className="h-screen w-screen bg-[#1c292f] flex flex-col gap-7 justify-center items-center">
    {/* <img src="./logo.png" alt="Logo" className="absolute top-0 left-2 w-48 h-48 m-4" /> */}
    {loading ? (
      // Loading Screen
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-[#6bde3b] border-solid"></div>
        <p className="text-[#6bde3b] text-2xl">Loading...</p>
      </div>
    ) : (
      // Main Content
      <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
      {timerExpired ? (
        <label className="text-[#6bde3b] text-2xl">Time's Up!'</label>
      ) : (
        <label className="text-[#6bde3b] text-2xl">Time remaining: {seconds} seconds</label>
      )}
        <label className="text-[#6bde3b] text-2xl">{question}</label>
      </div>
      <div className="flex flex-col gap-3">
        <button
          class="opthov flowbite-input custom-focus-styles w-96 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center hover:scale-110"
          type="button"
          onClick={() => setLocAns(optionA)}
        >
          {optionA}
        </button>
        <button
          class="opthov flowbite-input custom-focus-styles w-96 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center hover:scale-110"
          type="button"
          onClick={() => setLocAns(optionB)}
        >
          {optionB}
        </button>
        <button
          class="opthov flowbite-input custom-focus-styles w-96 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center hover:scale-110"
          type="button"
          onClick={() => setLocAns(optionC)}
        >
          {optionC}
        </button>
        <button
          class="opthov flowbite-input custom-focus-styles w-96 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center hover:scale-110"
          type="button"
          onClick={() => setLocAns(optionD)}
        >
          {optionD}
        </button>
      </div>
      <button
        class="flowbite-input custom-focus-styles w-40 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center hover:scale-110"
        type="button"
        onClick={() => handleSubmit()}
      >
        Submit & Next
      </button>
      </div>
  )}
</div>
  )
};

export default Question;
