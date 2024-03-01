import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import addavatar from '../Assets/addAvatar.png';
import { auth, storage, db } from '../firebase';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

export function InputAdornments() {
  const navigate=useNavigate();
  const [error, setError] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [file, setPic] = React.useState(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(username, email, password, file);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `avatars/${res.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
        },
        async () => {
          // Handle successful uploads on complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', res.user.uid), {
             uid:res.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate("/");

          } 
          
          catch (error) {
            setError(true);
          }
        }
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={handleClick}></form>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password"style={{color:"whitesmoke"}}>Username</InputLabel>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="standard-adornment-password" style={{color:"#DC7633"}}
            type={showPassword ? 'text' : 'username'}
            endAdornment={
              <InputAdornment position="end">
                {/* Adornment */}
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-email"style={{color:"whitesmoke"}}>Email</InputLabel>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="standard-adornment-email"style={{color:"#DC7633"}}
            type={showPassword ? 'text' : 'email'}
            endAdornment={
              <InputAdornment position="end">
                {/* Adornment */}
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password "style={{color:"whitesmoke"}}>Password</InputLabel>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="standard-adornment-password" style={{color:"#DC7633"}}
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
          <Typography variant="body2" color="text.secondary"style={{color:"grey"}}>
            At least 6 characters
          </Typography>
        </FormControl>
        <div className="mt-3 text-center">
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              setPic(e.target.files[0]);
            }}
          />
          <label htmlFor="file">
            <img src={addavatar} alt="" srcset="" style={{ cursor: 'pointer', left: '0' }} />
            <span>
              <Typography variant="body2" color="text.secondary"style={{color:"whitesmoke"}}>
                Add an avatar
              </Typography>
            </span>
          </label>
          <Button
            onClick={handleClick}
            className="btn"
            size="small"
            style={{ backgroundColor: '#DC7633', width: '200px', color: 'whitesmoke', border: 'solid 3px  #F5B041' }}
          >
            Register
          </Button>
          {error && <span>Something went wrong</span>
         }
          <Typography variant="body2" color="">
            <Link to={'/login'} style={{color:"#DC7633"}}>
              Sign In
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center',marginTop:"20px" }}>
        <Card sx={{opacity:"0.8",display: 'flex', padding: '90px', width: '70%', margin: '10px',height:"90vh",backgroundColor:"black" }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
               <span style={{color:"whitesmoke"}}>Welcome to </span> <span style={{color:"#DC7633"}}>Chit</span> <span style={{color:"#F5B041"}}>Chat</span>
              </Typography>
             
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              {/* Include the InputAdornments component here */}
              <InputAdornments />
            </Box>
          </Box>
          <CardMedia style={{backgroundColor:""}} 
            component="img"
            sx={{ width: 900, height: 300 }}
            image="/logo.png"
            alt="Live from space album cover"
          />


      
        </Card>
      </div>
    </>
  );
}
