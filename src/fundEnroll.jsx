import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import querystring from 'querystring';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 800,
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  centering: {
    width: 1000,
    margin: '0 auto'
  },
  button: {
    margin: theme.spacing(1)
  },
});

class FundEnroll extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email : this.props.loginData,
      fundName : '',
      totalPay : 0,
      payCnt : 0,
      pay : 0,
      doc : '',
    };
  }

  componentWillMount () {
    if(this.props.loginData == ''){
      alert('로그인 창으로 이동합니다.');
      location.href = '';
    }
  }

  setFund () {
    var params = querystring.stringify(
      this.state
    );
    axios.post('/createFund/', params)
            .then((Response) => {
              if(Response.data.result==='success'){
                console.log('success');
                alert("success");
                location.href = "#fundList";
              }
              if(Response.data.result==='fail'){
                console.log('fail');
                alert("빈칸을 모두 채워주세요");
              }
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
              }
            }).catch((err)=>{
              console.log(err);
            });
  }


  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

render(){
  const { classes } = this.props;
  return (
    <Container maxWidth="sm" >
      <div className={classes.centering}>
      <div>
      <TextField
        name="fundName"
        id="outlined-name"
        label="펀드명"
        className={classes.textField}
        value={this.state.fundName}
        onChange={(event) => this.handleChange(event)}
        margin="normal"
        variant="outlined"
      />
  </div>
  <div>
      <TextField
          name="totalPay"
          id="outlined-number"
          label="총투자액"
          value={this.state.totalPay}
          onChange={(event) => this.handleChange(event)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
    </div>
    <div>
        <TextField
            name="payCnt"
            id="outlined-number"
            label="납입횟수"
            value={this.state.payCnt}
            onChange={(event) => this.handleChange(event)}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
      </div>

    <div>
        <TextField
            name="pay"
            id="outlined-number"
            label="월납입금"
            value={this.state.pay}
            onChange={(event) => this.handleChange(event)}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
      </div>
      <div>
          <TextField
          name="doc"
          id="outlined-multiline-flexible"
          label="기타"
          multiline
          fullWidth
          rowsMax="20"
          value={this.state.doc}
          onChange={(event) => this.handleChange(event)}
          className={classes.textField}
          margin="normal"
          variant="outlined"

        />
    </div>
    <Button variant="contained" className={classes.button} onClick={() => this.setFund()}>
      펀드등록
    </Button>
    </div>
  </Container>
  );
  }
}
export default withStyles(styles)(FundEnroll);
