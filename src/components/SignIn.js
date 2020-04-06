import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../store/security/actions";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
        this.submitLogin = this.submitLogin.bind(this);
    }


    handleUsernameChange = event => {
        this.setState({
            user: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    submitLogin = event => {
        console.log(event);
        event.preventDefault();
        this.props.login(this.state.user, this.state.password);
    }

    render() {
        const {user, password} = this.state
        return (
            <form onSubmit={this.submitLogin}>
                <div style={{marginTop: 100}}>
                    <div>
                        <TextField
                            id="outlined-disabled"
                            label="User name"
                            variant="outlined"
                        />
                    </div>
                    <div style={{marginTop: 20}}>
                        <TextField
                            id="outlined-disabled"
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                    <div  style={{marginTop: 20}}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                            onClick={this.submitLogin}
                        >
                            Sign in...
                        </Button>
                    </div>
                </div>
            </form>)
    }
}


SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    //security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security45,
});


export default connect(mapStateToProps, {login})(SignIn);
