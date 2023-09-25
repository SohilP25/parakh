import { createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalRight, setTotalRight] = useState(0);
    const [topic, setTopic] = useState("");
    const [curntDiff,setCurntDiff] = useState(-1);
    const [conRight, setConRight] = useState(0);
    const [conWrong, setConWrong] = useState(0);
    
    const [totalEasy, setTotalEasy] = useState(0);
    const [correctEasy, setCorrectEasy] = useState(0);
    const [totalMedium, setTotalMedium] = useState(0);
    const [correctMedium, setCorrectMedium] = useState(0);
    const [totalHard, setTotalHard] = useState(0);
    const [correctHard, setCorrectHard] = useState(0);
    const [csvData, setCsvData] = useState("");


    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [optionA,setOptionA] = useState("");
    const [optionB,setOptionB] = useState("");
    const [optionC,setOptionC] = useState("");
    const [optionD,setOptionD] = useState("");

//   const history = useHistory();

//   useEffect(() => {

//   }, []);

  return (
    <DataContext.Provider value={{ 
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
       }}>
      {children}
    </DataContext.Provider>
  );
};

export const DataState = () => {
  return useContext(DataContext);
};

export default DataProvider;