import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function BasicExample(){
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to ="/">Home</Link>
          </li>
          <li>
          <Link to ="/about">About</Link>
          </li>
          <li>
          <Link to ="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard/>
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

function About(){
  return(
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard(){
  return(
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default BasicExample;
