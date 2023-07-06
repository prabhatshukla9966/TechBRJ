import Typography from "@mui/material/Typography";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";


function Form({handleSubmit,data,choice,feedback,handleRadioChange}) {
  

  return (
    <>

      <form onSubmit={handleSubmit}>
        {data.map((e, p_ind) => (
          <>
            <label key={p_ind} value={e} className="question">
 <h5>{e}</h5>
             
            </label>

            <RadioGroup
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                fontSize: 2,
              }}
              defaultValue=""
              key={new Date()}
              name={`radio-buttons-group-${p_ind}`}
              req
            >
              {choice[p_ind].map((item, c_ind) => {
                // console.log(item, c_ind);

                return (
                  <FormControlLabel
                    key={p_ind + c_ind}
                    // value={feedback[p_ind]}
                    checked={item === feedback[p_ind]}
                    onChange={() => handleRadioChange(p_ind, c_ind, item)}
                    control={
                      <Radio  sx={{ color: "text.secondary", fontSize: 2 }} />
                    }
                    required
                    label={
                      <Typography sx={{ fontSize: 12 }}>{item}</Typography>
                    }
                  />
                );
              })}
            </RadioGroup>
          </>
        ))}

     

        <button className="centered-button" type="submit">Submit</button>
      </form>
    </>
  );


}

export default Form;

