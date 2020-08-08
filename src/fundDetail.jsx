import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import querystring from 'querystring';
import axios from 'axios';

import Button from '@material-ui/core/Button';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
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
  }
});

class FundDetail extends React.Component {

  constructor(props){
    super(props);
    this.flag = 0;
    this.state = {
      fundName : '',
      totalPay : 0,
      payCnt : 0,
      pay : 0,
      doc : '',
      readOnly : true,
    };
  }

  componentWillMount () {
    if(this.props.loginData == ''){
      alert('로그인 창으로 이동합니다.');
      location.href = '';
    }
    this.getFundDetail();
  }

  getFundDetail () {
    var params = querystring.stringify(
      {fundNo : this.props.fundNo}
    );
    axios.post('/getFundDetail/', params)
            .then((Response) => {
              this.setState({
                fundName : Response.data.fund.fundName,
                totalPay : Response.data.fund.totalPay,
                payCnt : Response.data.fund.payCnt,
                pay : Response.data.fund.pay,
                doc : Response.data.fund.doc,
              });

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

  clickPayBtn (e){
    this.pay();
  }


  clickUpdateBtn(e){
    if(this.flag==0){
      this.flag = 1;
      //활성화
      this.setState({
        readOnly: false,
      });
    }else{
      this.flag = 0;
      this.updateFund();
      //비활성화
      this.setState({
        readOnly: true,
      });

    }
  }

  clickDeleteBtn(e){
    var delConfirm = confirm("정말 삭제하시겠습니까?");
    if(delConfirm == true){
        this.deleteFund();

    }
  }

  pay(){
    var params = querystring.stringify(
      { email : this.props.loginData,
        fundNo : this.props.fundNo,
        fundName : this.state.fundName,
        pay : this.state.pay,
        payCnt :this.state.payCnt + 1,
        totalPay : this.state.totalPay + this.state.pay,
        doc : this.state.doc,
      }
    );
    axios.post('/updateFund/', params)
            .then((Response) => {
              if(Response.data.result==='success'){
                this.setState({
                  payCnt :this.state.payCnt + 1,
                  totalPay : this.state.totalPay + this.state.pay,
                });
                alert('success');
              }
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
              }
            }).catch((err)=>{
              console.log(err);
            });
  }

  updateFund (){
    var params = querystring.stringify(
      { email : this.props.loginData,
        fundNo : this.props.fundNo,
        fundName : this.state.fundName,
        pay : this.state.pay,
        payCnt :this.state.payCnt,
        totalPay : this.state.totalPay,
        doc : this.state.doc,
      }
    );
    axios.post('/updateFund/', params)
            .then((Response) => {
              if(Response.data.result==='success'){
                alert('success');
                location.href='#fundList';
              }
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
              }
            }).catch((err)=>{
              console.log(err);
            });
  }

  deleteFund(){
    var params = querystring.stringify(
      { fundNo : this.props.fundNo,
      }
    );
    axios.post('/deleteFund/', params)
            .then((Response) => {
              if(Response.data.result==='success'){
                alert('success');
                location.href = "#fundList";
              }
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
              }
            }).catch((err)=>{
              console.log(err);
            });
  }

render(){
  const { classes } = this.props;
  const { readOnly } = this.state;
  return (
    <Container maxWidth="sm" >
      <div disabled className={classes.centering}>
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
        InputProps={{
          readOnly: Boolean(readOnly),
        }}
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
          InputProps={{
          readOnly: Boolean(readOnly),
        }}
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
            InputProps={{
          readOnly: Boolean(readOnly),
        }}
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
            InputProps={{
          readOnly: Boolean(readOnly),
        }}
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
          InputProps={{
          readOnly: Boolean(readOnly),
        }}
        />
    </div>
    </div>
    <Button variant="contained" className={classes.button} onClick={() => this.clickPayBtn(event)}>
      납입
    </Button>
    <Button variant="contained" className={classes.button} onClick={() => this.clickUpdateBtn(event)}>
      수정
    </Button>
    <Button variant="contained" className={classes.button} onClick={() => this.clickDeleteBtn(event)}>
      삭제
    </Button>
    <Button variant="contained" className={classes.button} onClick={() => location.href="#fundList"}>
      뒤로가기
    </Button>
  </Container>
  );
  }
}
export default withStyles(styles)(FundDetail);
