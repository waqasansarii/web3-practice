import { useEffect, useState } from "react";
import "./App.css";
import contract from "./contract/mintContract.json";
import {BigNumber, ethers} from 'ethers'

const contractAbi = contract.abi;
const address = "0xC674fA044324ACD545a29A6b080c07F20b43eB9b";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  // checkWalletIsConnected function within the App component that checks if the Metamask wallet exists.
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    
    if (ethereum) {
      console.log("MetaMast is exist i am ready to go!");
    } else {
      console.log("Are you sure that you have meta mask wallet");
    }
    // check wheater metamask is connect or not 
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    if (account.length !== 0) {
      setCurrentAccount(account[0]);
      console.log("account connected");
    } else {
      console.log("conneect please");
    }
  };

  // connect metamask to our website 
  const connetWallethandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please Install MetaMask ");
    }
    try {
      const getData = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(getData[0]);
      alert("Metamask successfully connected!");
      setCurrentAccount(getData[0]);
    } catch (err) {
      console.log("error", err);
    }
  };

  // mint function 
  const [mintAmmount,setMintAmmount] = useState(2);

  const mintNFTHandler = async () => {
    const {ethereum} = window
    // check wheater user have metamask wallet or not 
    if(ethereum){
      // create new provider 
      const provider =  new ethers.providers.Web3Provider(ethereum)
      const signer =  provider.getSigner();
      const contract = new ethers.Contract(address,contractAbi,signer)
      try{
        const mintCont =await contract.mint(BigNumber.from( mintAmmount))
        console.log('response', mintCont)

      }
      catch(err){
        console.log(err)
      }
    }

  };


  // our connect wallet button 
  const connetWalletButton = () => {
    return (
      <button
        onClick={connetWallethandler}
        className="cta-button connect-wallet-button"
      >
        Connet Wallet
      </button>
    );
  };

  // our mint button 
  const mintNftBtn = () => {
    return (
      <button onClick={mintNFTHandler} className="cta-button mint-nft-button">
        Mint
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
    // changeWallet()
  }, []);

  return (
    <div className="App">
      <div className="main-app">
        <h1>Scrappy Squirrels Tutorial</h1>
        <p>Wallet address : {currentAccount}</p>
        <div>{currentAccount ? mintNftBtn() : connetWalletButton()}</div>
      </div>
    </div>
  );
}

export default App;
