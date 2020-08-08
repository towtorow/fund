

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import querystring from 'querystring';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});




class FundList extends React.Component {


  constructor(props){
    super(props);
    this.state = {fundList : []};
  }

  componentWillMount () {
    if(this.props.loginData == ''){
      alert('로그인 창으로 이동합니다.');
      location.href = '';
    }
    this.getFundList();
  }

  getFundList (){
    var params = querystring.stringify(
      {email : this.props.loginData}
    );
    axios.post('/getFundList/', params)
            .then((Response) => {
              this.setState({fundList : Response.data.fundList});
              console.log(this.state.fundList[0]);
              if(Response.data.result==='noGetRequest'){
                console.log('noGetRequest');
                alert('noGetRequest');
              }
            }).catch((err)=>{
              console.log(err);
            });

  };

  loadFundDetail (fundNo) {
    location.href = "#fundDetail/"+fundNo;
  }

  loadFundEnroll (){
    location.href = "#fundEnroll";
  }

  pay(){

  }

  render(){
    const { classes } = this.props;
  return (


    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>펀드명</TableCell>
            <TableCell align="right">총투자액</TableCell>
            <TableCell align="right">납입횟수</TableCell>
            <TableCell align="right">월납입금

            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.fundList.map(row => (

            <TableRow key={row.fundNo} >
              <TableCell component="th" scope="row" >
                {row.fundName}
              </TableCell>
              <TableCell align="right">{row.totalPay}</TableCell>
              <TableCell align="right">{row.payCnt}</TableCell>
              <TableCell align="right">{row.pay}</TableCell>
              <TableCell align="right">
                <Button align="right" variant="contained" className={classes.button} onClick={() => this.loadFundDetail(row.fundNo)}>
                  상세
                </Button>
                </TableCell>
            </TableRow>


          ))}

        </TableBody>
      </Table>
      <Button variant="contained" className={classes.button} onClick={() => this.loadFundEnroll()}>
        펀드등록
      </Button>
    </Paper>
  );
  }
}

export default withStyles(styles)(FundList);
