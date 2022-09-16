import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://i.ibb.co/3B2LLMj/luke-chesser-3r-Wagd-KBF7-U-unsplash-1.jpg ");
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({width:'75%'})}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 17px;
`;

const Register = () => {
  const [err,setErr] = useState("");
  const [username , setUsername] =useState('');
  const [email , setEmail] =useState('');
  const [password , setPassword] =useState('');
  const [confirmPassword , setConfirmPassword] =useState('');
  const handleRegister = async (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      
      setErr("password not match");
    }else{
      const user ={
        username:username,
        email : email,
        password: password
      };
      console.log(user);
      const res=await register(user);
      console.log(res);
    }

  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" name="username" onChange={(e)=>setUsername(e.target.value)} />
          <Input placeholder="email" type='email' name="email"  onChange={(e)=> setEmail(e.target.value)} />
          <Input placeholder="password" type={password} name='password'onChange={(e)=>setPassword(e.target.value)} />
          <Input placeholder="confirm password"  type={password} onChange={(e)=>setConfirmPassword(e.target.value)} />
          <Agreement>
            T&C apply

          </Agreement>
          <Button onClick={handleRegister} >Sign Up</Button>
          <div style={{color:'red'}}>{err}</div>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
