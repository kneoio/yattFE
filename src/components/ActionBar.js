import * as React from "react";

export const ActionBar = (props) => {
   // console.log("action bar", props);
    let close_button;
    let save_button;
    let custom_button;

    const cancelForm = () => {
        window.location.replace('/view/tasks');
    }

    props.actions.map(row => {
        if (row.type === "CLOSE_FORM") {
/*            close_button = <Button onClick={cancelForm} variant="contained" style={{marginLeft: 10}}>Close</Button>;*/
        } else if (row.type === "SAVE") {
/*            save_button = <Button type="submit" variant="contained" style={{marginLeft: 10}}>Save</Button>;*/
        } else if (row.type === "CUSTOM") {
/*            custom_button = <Button type="submit" variant="contained" style={{marginLeft: 10}}>Start implementation&nbsp;<PlayCircleOutlineIcon/></Button>;*/
        }});

    return (
         <div>{close_button}{save_button}{custom_button}</div>
    )
}

