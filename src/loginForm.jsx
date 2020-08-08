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

export default function LoginForm(props) {
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
  const loadSigninForm = () => {
    location.href = "#signin";
  }
  const login = () =>{
    var params = querystring.stringify(values);
    axios.post('/login/', params)
            .then((Response) => {
              if(Response.data.result==='noExistId')
              {
                console.log('noExistId');
                alert('noExistId');
              }
              if(Response.data.result==='success'){
                props.callbackFromParent(Response.data.fundUser.email);
                console.log('success');
                alert("success");
                location.href = "#fundList";
              }
              if(Response.data.result==='fail'){
                console.log('fail');
                alert("fail");
              }
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
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
          <Button variant="contained" className={classes.button} onClick={login}>
            로그인
          </Button>
          <Button variant="contained" className={classes.button} onClick={loadSigninForm}>
        회원가입
      </Button>
    </div>
  </Container>
  );

}
