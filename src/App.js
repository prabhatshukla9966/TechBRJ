import { useEffect, useState } from "react";
import Form from "./Form";
import Navbar from "./Common/Navbar";
import SubmitData from "./SubmitData";

export default function App() {
  const [data, setData] = useState([]);
  const [choice, setChoice] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [logo, setLogo] = useState(null);

  const feed = async () => {
    try {
      const response = await fetch(
        "https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?format=json&unitID=1"
      );
      const jsonData = await response.json();
      setLogo(jsonData.companyLogo);
      console.log(jsonData);
      setData(jsonData.feedbackQuestions);
      const newArray = Array(jsonData.feedbackQuestions.length).fill("");
      setFeedback(newArray);

      setChoice(jsonData.choices);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    feed();
  }, []);

  // console.log(data);
  // console.log(submittedData);

  const handleRadioChange = (p1, c1, item) => {
    let modifiedArr = [...feedback];
    modifiedArr[p1] = item;
    console.log(
      "modifiedArr========>",
      modifiedArr,
      "Index is=====>",
      "parent is",
      p1,
      "child is",
      c1
    );
    setFeedback(modifiedArr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (feedback.every((value) => value !== "")) {
      // Submit the form

      console.log("Form submitted successfully!");
    } else {
      // Display an error or do something else when radio buttons are not checked
      console.log("Please fill in all the radio buttons.");
    }
  };

  return (
    <>
    <div className="logo">
 <Navbar logo={logo} />
    </div>
     
      <h4 className="parentcontainer provide-feedback" >{submitted ? "Thank you for your feedback ": "Please provide your feedback"} </h4>

     <div className="parentcontainer">
     {submitted ? <SubmitData data={data} feedback={feedback}/> :  <Form
        handleSubmit={handleSubmit}
        data={data}
        choice={choice}
        feedback={feedback}
        handleRadioChange={handleRadioChange}
        /> }

     </div>
      
      
        
    </>
  );
}
