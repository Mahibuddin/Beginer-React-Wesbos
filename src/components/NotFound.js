import React from 'react'
import {Link} from 'react-router-dom'

function NotFound({location}) {
    return (
        <div className="not-found">
            <h1>No Page Found as <span>{location.pathname}</span></h1>
            <Link to="/store">Back to homepage</Link>
        </div>
    )
}

export default NotFound;