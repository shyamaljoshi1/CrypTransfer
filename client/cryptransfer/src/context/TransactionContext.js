import React,{useEffect,useState}from'react';
import {ethers} from 'ethers';
import {contractABI,contractAddress} from '../utils/constants';


export const TransactionContext=React.createContext();

const{ethereum}=window;
    
const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;
}

export const TransactionProvider=({children})=>{
    const [currentAccount, setcurrentAccount] = useState("");
    const [formData, setformData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [isLoading, setisLoading] = useState(false);
    const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transaction, setTransaction] = useState([]);

    const handleChange=(e,name)=>{
        setformData((prevState)=>({...prevState,[name]:e.target.value}));
    }

    const getAllTransactions=async()=>{
        try{
            if(!ethereum)return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransaction=await transactionContract.getAllTransactions();
            const structuredTransaction=availableTransaction.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            setTransaction(structuredTransaction);
            console.log(structuredTransaction);
        }catch(error){
            console.log(error);
        }
    }
  

    const checkIfWalletIsConnected=async()=> {

        try {
            if(!ethereum)return alert("Please install metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});

            if(accounts.length){
                setcurrentAccount(accounts[0]);
                getAllTransactions();
            }
            else{
                console.log("No account found");
            }

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }

        

        //console.log(accounts);
    }
    
    const checkIfTransactionExists=async()=>{
        try{
            const transactionContract = getEthereumContract();
            const transactionCount=await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount",transactionCount);
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const connectWallet=async()=>{
        try{
            if(!ethereum)return alert("Please install metamask");
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setcurrentAccount(accounts[0]);
            window.location.reload();
        } catch(error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
        
    const sendTransaction=async()=>{
        try{
            if(!ethereum)return alert("Please install metamask");
            const{addressTo,amount,keyword,message}=formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:'0x5208',// 21000 GWEI
                    value:parsedAmount._hex,// 0.00001
                }]
                });
                const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
                setisLoading(true);
                console.log(`Loading${transactionHash.hash}`);
                await transactionHash.wait();
                setisLoading(false);
                console.log(`Success${transactionHash.hash}`);
                const transactionCount=await transactionContract.getTransactionCount();
                settransactionCount(transactionCount.toNumber());
            // get the data from the form ...
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    useEffect(()=>{
    checkIfWalletIsConnected();
    checkIfTransactionExists();
    },[]);

    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setformData,handleChange,sendTransaction,transaction,isLoading}}>
            {children}
        </TransactionContext.Provider>
    );
}