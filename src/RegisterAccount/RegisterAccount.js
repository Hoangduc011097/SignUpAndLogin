import React, { useState } from "react";
import {Form, FormGroup, Col, Label, Input, Container } from 'reactstrap';
import { Button } from 'reactstrap';
//captcha
import RefreshIcon from '@mui/icons-material/Refresh';
import './RegisterAccount.css'
import myImage from '../imgs/logo.jpg'
import {Link} from 'react-router-dom'
// toast message------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// animation rain
const rainContainer = document.getElementById('rain-container');
const borderArray = ['50px', '0px'] // giọt mưa tròn và vuông
const blurArray = ['0px','3px'] // giọt mưa sáng và mờ
const colorArray = ['#FF6B6B', '#FFE66D', '#4472CA']; // màu sắc giọt mưa
const width = document.documentElement.clientWidth;  // khoảng rơi của giọt mưa để k bị tràn ra ngoài
const height = document.documentElement.clientHeight;
const count = 90 ; // số lượng giọt

 export function createElementRandom (){
  for ( let i = 0; i< count; i++){
    let randomLeft = Math.floor(Math.random()*width); // math.floor để làm tròn thông số, math.random * widht để 
                                                              //  chạy random từ 0 cho đến độ lớn của width đã tạo (0 -> width -1) để k tràn ra khỏi màn hình
    let randomTop = Math.floor(Math.random()*height);
    let color = Math.floor(Math.random()*3); // *3 vì có 3 phần tử trong colorArray
    let widhtElement = Math.floor (Math.random()*10) ; // kích cỡ chạy từ 1-9
    let border = Math.floor (Math.random()*2);
    let blur = Math.floor (Math.random()*2);
    let timeAnimation =Math.floor (Math.random()*25);

    let div = document.createElement('div');
    div.style.backgroundColor = colorArray [color];
    div.style.position ='absolute';
    div.style.width = widhtElement + 'px';
    div.style.height = widhtElement + 'px';
    div.style.marginLeft = randomLeft + 'px';
    div.style.marginTop = randomTop + 'px';
    div.style.borderRadius = borderArray [border];
    div.style.filter = 'blur(' + blurArray[blur] + ')';
    div.style.animation ='move ' +timeAnimation+ 's ease-in infinite';


    rainContainer.appendChild(div);

  
  }
}
createElementRandom();


// toast message------------------------

const notify = () => toast();
// Thong tin user va validated account

const iniFormValue = {
  userName : '',
  email : '',
  password : '',
}


export default function RegisterPage (){
  const [formValue,setFormValue] = useState(iniFormValue);
  const confirmPassword = document.querySelector('#confirmPassword')
  const handleChange = (e) =>{
    const {value, name} = e.target; // value và name lấy trong ô input
    setFormValue({
      ...formValue,
      [name]:value,
    })
    }

    // Tao ma captcha --------------------------------------------------------------------------
      const randomString = Math.random().toString(36).slice(8);
      const [captcha, setCaptcha] = useState(randomString);
      const captchaText = document.querySelector('#captcha-text');
      const captchaActive = document.querySelector('#captcha');
      
    
      const refreshString = () => {
        setCaptcha(Math.random().toString(36).slice(8));
      }
      const [checkUser,setCheckUser] = useState([]);
    
//-------------------------------------------------------------------------------------------------------------------
    const handleSubmit = (e) =>{
      e.preventDefault();
      // validate email
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // validate username
      const usernameRegex = /^[a-zA-Z0-9_-]{4,16}$/


      if (formValue.userName == '' ||formValue.email == ''||formValue.password == ''||confirmPassword.value == ''){
        toast("Please fill full information!")
      }
      else if(captchaActive.textContent !== captchaText.value ){
        toast('Enter wrong captcha, please fill again')
  
      } else if(!formValue.email.match(pattern)){
        toast('Email not valid')

      }else if(!formValue.userName.match(usernameRegex)){
        toast('Username not valid')
  
      }
      else if(formValue.password !== confirmPassword.value){
        toast('Password and confirm password not match');
  
      }
     
     
      else {
        // Get data from API --------------------------------------
        fetch('https://64917a7f2f2c7ee6c2c84970.mockapi.io/User', {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(tasks => {

        function checkNameExists(array) {
          return array.some(item => item.userName === formValue.userName);
        }
            // console.log(tasks);
              if (checkNameExists(tasks)){
                toast('Username already exists')

              }
              else{
                toast ('Register successful');
                    // PUSH data len MockAPI------------------------------------------------------------
                    fetch('https://64917a7f2f2c7ee6c2c84970.mockapi.io/User', {
                        method: 'POST',
                        headers: {'content-type':'application/json'},
                    // Send your data in the request body as JSON
                            body: JSON.stringify(formValue)
                          }).then(res => {
                            if (res.ok) {
                                return res.json();
                            }
                            // handle error
                          }).then(task => {
                            console.log(task);
                            // do something with the new task
                          }).catch(error => {
                            // handle error
                          })
                  
                    
              }

        // Do something with the list of tasks
      }).catch(error => {
        // handle error
      })
        

        }
      }

       
      
    return(
       <Container>  
      
     
        <Link to ='/' id='header'>
          <img src={myImage}/>
        </Link>
        {/* <div id="rain-container">
        </div> */}
        <Form onSubmit={handleSubmit} id="form-container">
          <Label id="name-page">Register Account</Label>
        <FormGroup row>
          <Label for="exampleEmail" sm={2} className="name-input" size="lg">Username</Label>
          <Col sm={10}>
            <Input  type="text" name="userName" className="exampleEmail2"  bsSize="lg" onChange={handleChange} 
            value={formValue.userName} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail2" className="name-input" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="text" name="email" className="exampleEmail2" onChange={handleChange} 
            value={formValue.email} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail2" className="name-input" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password"  name ="password" className="exampleEmail2" onChange={handleChange} 
            value={formValue.password}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail2" className="name-input" sm={2}>Confirm Password</Label>
          <Col sm={10}>
            <Input type="password" id="confirmPassword" className="exampleEmail2" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label id="captcha" for="exampleEmail2" className="name-input" sm={2}>{captcha}<Button id="btn-refresh"
              onClick={() => refreshString()}
            ><RefreshIcon /></Button>
          </Label>
          <Col sm={10}>
            <Input type="text" id="captcha-text" className="exampleEmail2" />
          </Col>
        </FormGroup>
        

        <Button id="btn-register" color="primary" outline>Register</Button>
  
      </Form>
      <div>
        {/* Toast message */}
        <ToastContainer style={{fontSize:'20px'}} />
      </div>

      </Container>
        
        );
    

}