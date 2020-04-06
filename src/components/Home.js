import React from 'react'
import {Link} from "react-router-dom";

const Home = () => (
    <div>
        <h1>Home page</h1>
        <Link to={"tasks"}>Jump to tasks</Link>
    </div>
)

export default Home
