import Feedbackcard from "./Feedbackcard";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function App() {
  const [data, setData] = useState([]);
  const [choice, setChoice] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({ name: "", email: "" });
  };

  const feed = async () => {
    try {
      const response = await fetch(
        "https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?format=json&unitID=1"
      );
      const jsonData = await response.json();
      setData(jsonData.feedbackQuestions);
      setChoice(jsonData.choices);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    feed();
  }, []);

  console.log(data);
  console.log(submittedData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent
            sx={{ display: "flex", flexWrap: "wrap", minWidth: 275 }}
          >
            {data.map((e, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: 275,
                  width: "100%",
                  marginRight: { xs: 0, sm: "16px" },
                  marginBottom: "16px",
                }}
              >
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  value={e}
                  onChange={handleChange}
                >
                  {e}
                </Typography>

                <RadioGroup
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    fontSize: 2,
                  }}
                  defaultValue=""
                  name={`radio-buttons-group-${i}`}
                >
                  {choice[i].map((item, ind) => (
                    <FormControlLabel
                      key={ind}
                      value={item}
                      onChange={(e) => setSubmittedData(e.target.value)}
                      control={
                        <Radio sx={{ color: "text.secondary", fontSize: 2 }} />
                      }
                      label={
                        <Typography sx={{ fontSize: 12 }}>{item}</Typography>
                      }
                    />
                  ))}
                </RadioGroup>

                <ul></ul>
              </Box>
            ))}
          </CardContent>
        </Card>

        <button type="submit">Submit</button>
      </form>
      <ul>{submittedData}</ul>
    </>
  );
}
