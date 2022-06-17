import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

export default function NestingExample(){
    return (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to ="/">Home</Link>
                </li>
                <li>
                    <Link to ="/topics">Topics</Link>
                </li>
            </ul>
        <hr/>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/topics">
                <Topics />
            </Route>
        </Switch>
        </div>
    </Router>
    );
}

function Home(){
    return(
        <div>
            <h2>Home</h2>
        </div>
    );
}

function Topics(){
    let { path, url } = useRouteMatch();
    return (
        <Router>
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${url}/Sate, Nasi goreng`}>Kuliner</Link>
                    </li>
                    <li>
                        <Link to={`${url}/Wisata alam, Museum`}>Travelling</Link>
                    </li>
                    <li>
                        <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path={path}>
                        <h3>Please select a topic.</h3>
                    </Route>
                    <Route path={`${path}/:topicId`}>
                        <Topic />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Topic(){
    let { topicId } = useParams();

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}