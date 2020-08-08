import React from 'react';
import {render} from 'react-dom';
import Backbone from 'backbone';
import LoginForm from './loginForm.jsx';
import SigninForm from './signinForm.jsx';
import Header from './header.jsx';
import FundList from './fundList.jsx';
import FundDetail from './fundDetail.jsx';
import FundEnroll from './fundEnroll.jsx';
var root = document.getElementById('root');

var data = '';

var myCallback = (dataFromLoginForm) => {
  data = dataFromLoginForm
};

var Router = Backbone.Router.extend({
  routes : {
    ""    : "login",
    "login" : "login",
    "signin" : "signin",
    "fundList" : "fundList",
    "fundDetail/:fundNo":"fundDetail",
    "fundEnroll":"fundEnroll",
    "logout":"logout",
  },

  logout : function() {
    data = '';
    render(
      <div>
      <Header loginData={data}/>
      <LoginForm callbackFromParent={myCallback}/>
      </div>,
      root
    );
  },

  login : function() {
    render(
      <div>
      <Header loginData={data}/>
      <LoginForm callbackFromParent={myCallback}/>
      </div>,
      root
    );
  },
  signin : function() {
    render(
      <div>
      <Header loginData={data}/>
      <SigninForm />
      </div>,
      root
    );
  },
  fundList : function() {
    render(
      <div>
      <Header loginData={data}/>
      <FundList loginData={data}/>
      </div>,
      root
    );
  },
  fundDetail : function(fundNo) {
    render(
      <div>
      <Header loginData={data}/>
      <FundDetail loginData={data} fundNo = {fundNo}/>
      </div>,
      root
    );
  },
  fundEnroll : function() {
    render(
      <div>
      <Header loginData={data}/>
      <FundEnroll loginData={data}/>
      </div>,
      root
    );
  },
});

new Router();

Backbone.history.start();
