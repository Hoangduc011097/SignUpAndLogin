import React, { useState } from "react";
import {Form, FormGroup, Col, Label, Input, Container } from 'reactstrap';
import { Button } from 'reactstrap';
//captcha
import RefreshIcon from '@mui/icons-material/Refresh';
import './RegisterAccount.css'



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



// Thong tin user va validated account

const iniFormValue = {
  userName : '',
  email : '',
  password : '',
  confirmPassword: ''
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

    // Tao ma captcha --------------------------------------------------------------------------
      const randomString = Math.random().toString(36).slice(8);
      const [captcha, setCaptcha] = useState(randomString);
      const captchaText = document.querySelector('#captcha-text');
      const captchaActive = document.querySelector('#captcha');
      
    
      const refreshString = () => {
        setCaptcha(Math.random().toString(36).slice(8));
      }
    
//-------------------------------------------------------------------------------------------------------------------
    const handleSubmit = (e) =>{
      e.preventDefault();
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;



      if (formValue.userName == '' ||formValue.email == ''||formValue.password == ''||formValue.confirmPassword == ''){
        alert('Please fill full information');
      }
      else if(!formValue.email.match(pattern)){
        alert('Email not valid')

      }
      else if(formValue.password !== formValue.confirmPassword){
        alert('Password and confirm password not match');

      }
      else if(captchaActive.textContent !== captchaText.value ){
        alert('Enter wrong captcha, please fill again')

      }
      else {
        console.log(formValue)
        alert ('Register successful');
      }
    }
  


    return(
       <Container>
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
            <Input type="password" name="confirmPassword" className="exampleEmail2" onChange={handleChange}
            value={formValue.confirmPassword}/>
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

      </Container>
        
        );
    

}