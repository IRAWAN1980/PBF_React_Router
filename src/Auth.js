import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom";

export default function AuthExample() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fakeAuth = {
        isAuthenticated: isAuthenticated,
        authenticate(cb) {
            fakeAuth.isAuthenticated = true;
            setIsAuthenticated(true);
            setTimeout(cb, 100);
        },
        signout(cb) {
            setIsAuthenticated(false);
            fakeAuth.isAuthenticated = false;
            setTimeout(cb, 100);
        },
    };

    return (
        <Router>
            <div>
                <AuthButton fakeAuth={fakeAuth} isAuthenticated={isAuthenticated} />

                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/private">Private Page</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/public">
                        <PublicPage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage fakeAuth={fakeAuth} />
                    </Route>
                    <PrivateRoute path="/private" fakeAuth={fakeAuth}>
                        <ProtectedPage />
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

function AuthButton(props) {
    const { fakeAuth, isAuthenticated } = props;
    let history = useHistory();

    return isAuthenticated ? (
        <p>
            Welcome!{" "}
            <button
            onClick={() => {
                fakeAuth.signout(() => history.push("/"));
            }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

function PrivateRoute({ children, ...rest }) {
    const {fakeAuth} = rest;

    return(
        <Route
        {...rest}
        render={({location}) =>
            fakeAuth.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: location}
                    }}
                />
            )}
        />
    );
}

function PublicPage() {
    return <h3>Public</h3>
}

function ProtectedPage() {
    return <h3>Private</h3>
}

function LoginPage(props) {
    const {fakeAuth} = props;

    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: { pathname: "/"}};
    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from);
        });
    };

    return(
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}