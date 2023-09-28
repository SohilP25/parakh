import React, { useState, useEffect } from "react";
import { DataState } from "../Context/DataProvider.js";
import Generator from "../Components/Generator.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [toggleDifficulty, setToggleDifficulty] = useState(false);
  const difAry = ["Beginner", "Intermediate", "Advanced"];
  const difLvl = ["Easy", "Medium", "Hard"];
  // console.log(process.env.REACT_API_KEY);
  const [loading, setLoading] = useState(false);

  const {
    topic,
    setTopic,
    curntDiff,
    setCurntDiff,
    totalCount,
    setTotalCount,
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

  // useEffect(() => {

  // }, [toggleDifficulty])

  const navigate = useNavigate();

  
  async function fetchData() {
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

  function handleDifficulty(val) {
    setCurntDiff(val);
    // console.log(val);
    setToggleDifficulty(!toggleDifficulty);
  }

  async function handleSubmit() {
    setLoading(true);
    if (topic === "") {
      alert("Select the topic");
      setLoading(false);
    } else if (curntDiff === -1) {
      alert("Select Difficulty");
      setLoading(false);
    } else if (totalCount < 4) {
      alert("Number of questions must be four or greater than that");
      setLoading(false);
    } else {
      setCsvData(csvData.concat("Question,OptionA,OptionB,OptionC,OptionD,CorrectAns,SelectedAns,TimeTaken,CurDiff\n"));
      await fetchData();
      setLoading(false);
      navigate("/question");
    }
    // console.log(topic);
    // console.log(curntDiff);
    // console.log(totalCount);
  }
  return (
    <div className=" h-screen w-screen bg-[#1c292f] flex flex-col gap-7 justify-center items-center">
    <img src="./logo.png" alt="Logo" className="absolute top-0 left-2 w-48 h-48 m-4" />
      {loading ? (
        // Loading Screen
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-[#6bde3b] border-solid"></div>
          <p className="text-[#6bde3b] text-2xl">Loading...</p>
        </div>
      ) : (
        <div class="flex flex-col gap-3 justify-center items-center" >
          <div>
            <div class="flex flex-col gap-3">
              <label className="text-[#6bde3b] text-2xl">
                {" "}
                Enter Topic Name{" "}
              </label>
              <input
                type="search"
                id="default-search"
                class="flowbite-input w-96 custom-focus-styles block p-2 pl-10 text-lg bg-inherit text-[#6bde3b] border border-white-600 rounded-xl"
                placeholder="Search"
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <label className="text-[#6bde3b] text-2xl">
              {" "}
              Select Difficulty
            </label>
            <div>
              <button
                class="flowbite-input custom-focus-styles w-96 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center"
                type="button"
                onClick={() => setToggleDifficulty(!toggleDifficulty)}
              >
                {curntDiff === -1 ? "Select Difficulty" : difAry[curntDiff]}{" "}
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>
            <div>
              {toggleDifficulty && (
                <div
                  id=""
                  class=" fixed  w-96 z-10 bg-inherit divide-y divide-gray-100 rounded-lg shadow"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200 bg-[#1c292f]"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li
                      class="block px-4 py-2 dark:hover:bg-green-500 dark:hover:text-white rounded-lg, cursor-pointer"
                      onClick={() => handleDifficulty(0)}
                    >
                      Beginner
                    </li>
                    <li
                      class="block px-4 py-2 dark:hover:bg-green-500 dark:hover:text-white rounded-lg cursor-pointer"
                      onClick={() => handleDifficulty(1)}
                    >
                      Intermediate
                    </li>
                    <li
                      class="block px-4 py-2 dark:hover:bg-green-500 dark:hover:text-white rounded-lg cursor-pointer"
                      onClick={() => handleDifficulty(2)}
                    >
                      Advanced
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-3">
              <label className="text-[#6bde3b] text-2xl">
                {" "}
                Enter Number of Question
              </label>
              <input
                type="number"
                id="default-search"
                class="flowbite-input w-96 custom-focus-styles block p-2 pl-10 text-lg bg-inherit text-[#6bde3b] border border-white-600 rounded-xl"
                placeholder="Enter No. of question"
                onChange={(e) => setTotalCount(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <button
              class="flowbite-input custom-focus-styles w-24 text-white border border-white bg-inherit focus:ring-4 focus:outline-none font-medium rounded-lg text-lg py-2.5 inline-flex justify-center items-center hover:scale-110"
              type="button"
              onClick={() => handleSubmit()}
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
