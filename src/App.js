import "./App.css";
import { AppProvider } from "./Contexts/AppContext";
import Page from "./Pages/Page";
import RegisterPage from "./RegisterAccount/RegisterAccount";
import {createElementRandom} from "./RegisterAccount/RegisterAccount";
import { Container } from "reactstrap";
import LoginPage from './LoginPage/LoginPage'

function App() {
  return (
    <Container>
    <createElementRandom/>
   {/* <RegisterPage/>  */}
    <LoginPage/>
   </Container>
  );
}

export default App;
