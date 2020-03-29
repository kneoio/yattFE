import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchTasks} from "../store/task/actions";

class SimpleTable extends React.Component {

    componentWillMount() {
        this.props.fetchTasks();
    }

    render() {
        console.log('data received');
        console.log(this.props.tasks.serverPage.viewPage.result);
        const taskItems = this.props.tasks.serverPage.viewPage.result.map(task => (
            <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.status}</p>
                <p>{task.stage}</p>
            </div>
        ));
        return (
            <div>
                <h1>Posts</h1>
                {taskItems}
            </div>
        );
        //return <div>test 13</div>
    }
}

SimpleTable.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.tasks,
});


export default connect(mapStateToProps, { fetchTasks })(SimpleTable);
