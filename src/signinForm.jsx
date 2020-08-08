import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import querystring from 'querystring';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  centering:{
    width: 200,
    margin: '0 auto'
  }
}));

export default function SigninForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email : '',
    password : ''
  });

  const handleChange = name => event => {
    if(name == 'email'){
      setValues({
        email : event.target.value,
        password : values.password
      });
    }
    if(name == 'password'){
      setValues({
        email : values.email,
        password : event.target.value
      });
    }
  };

  const signin = () =>{
    var params = querystring.stringify(values);
    axios.post('/signin/', params)
            .then((Response) => {
              if(Response.data.result==='success'){
                console.log('success');
                alert('success');
                location.href = "";
              }
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
              }
              if(Response.data.result==='alreadyExistId'){
                alert("alreadyExistId");
              }
            }).catch((err)=>{
              console.log(err);

            });


  }

    return (
      <Container maxWidth="sm" >
        <div className={classes.centering}>
        <TextField
        id="standard-name"
        label="email"
        className={classes.textField}
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        margin="normal"
        />
      <br/>
        <TextField
          id="standard-password-input"
          label="password"
          className={classes.textField}
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
          />
        <br/>
          <Button variant="contained" className={classes.button} onClick={signin}>
            회원가입
          </Button>

    </div>
  </Container>
  );

}
