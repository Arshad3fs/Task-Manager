import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import client from './client/client';
import MyReportessTasks from './components/my-reportees-tasks/MyReporteesTasks';
import MyTasks from './components/my-tasks/MyTasks';
import MyReportsByStatus from './components/reports/MyReportsByStatus';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Welcome from './components/welcome/Welcome';
import customTheme from './theme/theme';
import { ROUTES } from './utils/AppConstants';

function App() {

  return (
    <ThemeProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path={ROUTES.signIn}>
              <Signin />
            </Route>
            <Route path={ROUTES.singUp}>
              <Signup />
            </Route> 
            <Route path={ROUTES.welcome}>
              <Welcome />
            </Route>
            <Route path={ROUTES.myTasks}>
              <MyTasks />
            </Route>
            <Route path={ROUTES.myReporteesTasks}>
              <MyReportessTasks />
            </Route>
            <Route path={ROUTES.myReports}>
              <MyReportsByStatus />
            </Route>
            <Route path="/">
              <Signup/>
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>     
    </ThemeProvider>        
  );
}

export default App;
