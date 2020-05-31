import React from 'react';
import TextField from '@material-ui/core/TextField';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../store/security/actions";
import Alert from "@material-ui/lab/Alert";
import {Field, reduxForm} from 'redux-form'
import Fab from "@material-ui/core/Fab";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin (formData) {
        console.log(formData);
        this.props.login(formData.user, formData.password);
    }

    renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
        <TextField
            label={label}
            style={{width: 300}}
            variant="outlined"
            {...input}
            {...custom}
        />
    )

    render() {
        let message = '';
        if (this.props.security.type === 'LOGIN_FAIL'){
            message = <Alert severity="error">{this.props.security.title}</Alert>
        }
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitLogin)}>
                <div style={{marginTop: 100}}>
                    <div>
                        <Field name="user" component={this.renderTextField} label="User name"/>
                    </div>
                    <div style={{marginTop: 20}}>
                        <Field name="password" type="password" component={this.renderTextField} label="Password"/>
                    </div>
                    <div  style={{marginTop: 20}}>
                        <Fab type="submit" variant="contained" style={{marginLeft: 10, marginBottom:100}}>
                            <ExitToAppTwoToneIcon/>&nbsp;Sign in...
                        </Fab>
                    </div>
                    <img className="img-fluid"
                         src={`${process.env.PUBLIC_URL}/images/juka_logo.png`}
                         alt="logo"/>
                </div>
                {message}
            </form>
        )
    }
}

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    //security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security.serverPage
});

SignIn = reduxForm({
    form: 'sign_in_form'
})(SignIn);


export default connect(mapStateToProps, {login})(SignIn);
