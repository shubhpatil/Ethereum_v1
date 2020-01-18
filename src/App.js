import React, { Component } from 'react';
import Web3 from 'web3';
import { Contract_Address, ABI_Code  } from './web3config';
import './App.scss';

export default class App extends Component {
  
  state = {
    network : "",
    account : "",
    balance : "",
    contract : "",
    name: ""
  }

  componentDidMount(){
    this.Blockchain();
  }

  Blockchain = async () => {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    const account = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(account[0]);
    const MyContract = new web3.eth.Contract(ABI_Code, Contract_Address);

    this.setState({network : network, account: account[0], contract: MyContract, balance: balance});
    console.log(MyContract);
    let name = await MyContract.methods.getName().call();
    this.setState({ name : name });
    // MyContract.methods.setName("Shubh").send({from: account[0]}).then(async res => {
    //   console.log(res);
    //   console.log(await MyContract.methods.getName().call());
    // }).catch(err => console.log(err));

  } 

  render() {
    return (
      <div className="container">
        <h1>Ethereum - Solidity - Web3 - Metamask</h1>
        <h4>Network : { this.state.network }</h4>
        <h4>Account Address : { this.state.account }</h4>
        <h4>Balance : { this.state.balance }</h4>
        <h3>Name : { this.state.name }</h3>
      </div>
    )
  }
}
