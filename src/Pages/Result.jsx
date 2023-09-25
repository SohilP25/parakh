import React from "react";
import Charts from "../Components/Charts.jsx";
import { DataState } from "../Context/DataProvider.js";

const Result = () => {
  const {
    totalCount,
    setTotalCount,
    totalRight,
    setTotalRight,
    topic,
    setTopic,
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
  const WeightEasy = 0.2;    // 30% importance
const WeightMedium = 0.4;  // 40% importance
const WeightHard = 0.4;    // 30% importance

const Proficiency =
  ((WeightEasy * correctEasy) +
   (WeightMedium * correctMedium) +
   (WeightHard * correctHard)) /
  ((WeightEasy * totalEasy) +
   (WeightMedium * totalMedium) +
   (WeightHard * totalHard)) * 10;

   const downloadCsv = () => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };


  return (
    <div className="h-screen w-screen bg-[#1c292f] flex flex-col gap-16 justify-center ">
      <div className="text-3xl text-[#6bde3b] pl-10 self-start">
        <p>Your assessment has been completed,</p>
        <p>Here is your result</p>
      </div>
      <div className="flex gap-6 self-center">
        <div className="w-60 h-60">
          <Charts
            totalQuestions={totalEasy + totalMedium + totalHard}
            rightQuestions={totalRight}
            totalLabel={"Total Questions"}
            rightLabel={"Total Correct Questions"}
          />
        </div>
        <div className="w-60 h-60">
          <Charts
            totalQuestions={totalEasy}
            rightQuestions={correctEasy}
            totalLabel={"Total Easy Questions"}
            rightLabel={"Total Easy Correct Questions"}
          />
        </div>
        <div className="w-60 h-60">
          <Charts
            totalQuestions={totalMedium}
            rightQuestions={correctMedium}
            totalLabel={"Total Medium Questions"}
            rightLabel={"Total  Medium Correct Questions"}
          />
        </div>
        <div className="w-60 h-60">
          <Charts
            totalQuestions={totalHard}
            rightQuestions={correctHard}
            totalLabel={"Total Hard Questions"}
            rightLabel={"Total Hard Correct Questions"}
          />
        </div>
      </div>
      <div className="text-3xl text-[#6bde3b] pl-10 self-start">
        <p>Your Proficiency in {topic} is {Proficiency.toFixed(2)} out of 10.</p> 
        <button  className="m-2 border p-3 rounded-lg" onClick={downloadCsv}>Download CSV</button>
      </div>
    </div>
  );
};

export default Result;
