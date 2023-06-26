import React, { useState } from "react";
import {Form, FormGroup, Col, Label, Input, Container } from 'reactstrap';
import { Button } from 'reactstrap';
import './LoginPage.css'
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
  password : '',
}


export default function RegisterPage (){
  const [formValue,setFormValue] = useState(iniFormValue);
  // const [formError, setFormError] = useState({}); // validate form

  const handleChange = (e) =>{
    const {value, name} = e.target; // value và name lấy trong ô input
    setFormValue({
      ...formValue,
      [name]:value,
    })
    }
        
    const handleSubmit = (e) =>{
      e.preventDefault();

      if (formValue.userName == '' ||formValue.password == ''){
        alert('Please fill full information');
      }
      else {     // console.log(formValue)
        // alert ('Login successful');
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
            return array.some(item => item.userName === formValue.userName && item.password === formValue.password);
          }
              // console.log(tasks);
                if (checkNameExists(tasks)){
                  // navigator'/'
                  toast('Login successful')
  
                }
                else{
                  toast('Username or password not valid')
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
        <Form onSubmit={handleSubmit} id="form-container">
          <Label id="name-page">Login Page</Label>
        <FormGroup row>
          <Label for="exampleEmail" sm={2} className="name-input" size="lg">Username</Label>
          <Col sm={10}>
            <Input  type="text" name="userName" className="exampleEmail2"  bsSize="lg" onChange={handleChange} 
            value={formValue.userName} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail2" className="name-input" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password"  name ="password" className="exampleEmail2" onChange={handleChange} 
            value={formValue.password}/>
          </Col>
        </FormGroup>
        <Button id="btn-register" color="primary" outline>Login</Button>

      </Form>
      <div>
        {/* Toast message */}
        <ToastContainer style={{fontSize:'20px'}} />
      </div>

      </Container>
        
        );
    

}