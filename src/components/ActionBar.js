import * as React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export const ActionBar = (props) => {
    let close_button;
    let save_button;
    let custom_button;

    const saveForm = () => {
        props.formRef.current.handleSubmit();
    }

    props.actions.map(row => {
        if (row.type === "CLOSE_FORM") {
            close_button = <Button variant="outline-dark" href="/view/tasks">Close</Button>;
        } else if (row.type === "SAVE") {
            save_button = <Button onClick={saveForm} variant="outline-success">Save & Close</Button>;
        } else if (row.type === "CUSTOM" ) {
            custom_button = <Button variant="outline-success">Start implementation</Button>;
        }});
    return (
        <ButtonGroup>{close_button}{save_button}{custom_button}</ButtonGroup>
    )
}

