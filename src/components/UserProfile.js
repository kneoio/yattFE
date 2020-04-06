import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserProfile} from "../store/userprofile/actions";
import {Input} from "@material-ui/core";


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name:'',
                roles:'',
                info: ''
            }
        };
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    render() {
        let user = this.props.profile
        return <div>
            <h1>UserProfile</h1>
            <Input>{user.info}</Input>
            <Link to={"home"}>Jump to home</Link>
        </div>
    }
}


UserProfile.propTypes = {
    getUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {getUserProfile})(UserProfile);
