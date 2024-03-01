import React, { useContext, useReducer, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Login() {

const[err,setErr]= React.useState(false);
const [password, setPassword] = React.useState('');
const [email, setEmail] = React.useState('');
const navigate=useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(email, password);


    try {
      const res= await signInWithEmailAndPassword(auth, email, password)
      console.log('result',res);
      navigate('/');
    } catch (error) {
      setErr(true);
      console.log('error',error);
    }
  }
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
    <div className='container-fluid' style={{ display:"flex",justifyContent:"center",textAlign:"center",marginTop:"100px"}}>
     <Card style={{width:"300px",padding:"10px",opacity:"0.8",backgroundColor:"black "}}>
      <CardMedia
        sx={{ height: 165 }}
        image="/logo.png"
        title="green iguana"
      />
      <CardContent>
        
        <Typography variant="subtitle" color=""className='text-light'>
         Login
        </Typography>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            
          <InputLabel htmlFor="standard-adornment-password" className='text-light'>Email</InputLabel>
          <Input  style={{color:"orange"}} onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'email'}
            endAdornment={
              <InputAdornment position="end">
               
              </InputAdornment>
            }
          />
        </FormControl>
        <br></br>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            
          <InputLabel htmlFor="standard-adornment-password" className='text-light'>Password</InputLabel>
          <Input style={{color:"orange"}} onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        
      </CardContent>
      <CardActions className='d-flex justify-content-center'>
        <Button  className="btn" size="small" style={{backgroundColor:"orange",width:"200px",color:"white"}} onClick={handleClick}>Sign In</Button>
        {err && <span style={{color:"whitesmoke"}}>Something went wrong</span>}
      </CardActions>
      <Typography variant="body2" color=""className='text-light'>
         New User? Register Here <Link to={'/Register'} style={{color:"#DC7633"}}>Sign Up</Link>
        </Typography>
    </Card>
    </div>
    </>
  )
}

export default Login