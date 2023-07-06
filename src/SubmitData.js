

function SubmitData({data,feedback}) {
    return (<>

        <div>
             {data.map((item, ind) => {
              return (
                <p>
                 <strong> You feedback for <label style={{ color: "brown" }}>{item}</label> is <label style={{ color: "red" }}>{feedback[ind]}</label> </strong>
                </p>
              );
            })}
        </div>
        </>
    )
}

export default SubmitData
