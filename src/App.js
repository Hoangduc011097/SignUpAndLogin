import "./App.css";
import RegisterPage from "./RegisterAccount/RegisterAccount";
import {createElementRandom} from "./RegisterAccount/RegisterAccount";
import { Container } from "reactstrap";
// import LoginPage from './LoginPage/LoginPage.js'

function App() {
  return (
    <Container>
    <createElementRandom/>
   <RegisterPage/> 
    {/* <LoginPage/> */}
   </Container>
  );
}

export default App;
