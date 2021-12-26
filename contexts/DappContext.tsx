declare let window: any;
import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DappContextProps } from "../utils/contracts";

const DappContext = createContext<DappContextProps>({
  isLoading: false,
  currentAccount: null,
  connectWalletAction: async () => {},
});

export const DappProvider: React.FC = ({ children }) => {
  const data = useProviderData();

  return <DappContext.Provider value={data}>{children}</DappContext.Provider>;
};

export const useDapp = () => useContext<DappContextProps>(DappContext);

export const useProviderData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<String | null>(null);
  const [charactersNFT, setCharactersNFT] = useState(null);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        setIsLoading(false);
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
      checkNetwork();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

  // Check for the connect network
  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== "4") {
        alert("Please connect to Rinkeby!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(`err`, err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log("Checking for Balance on address : ", currentAccount);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const DappContract = new ethers.Contract(
      //   CONTRACT_ADDRESS,
      //   erc20Token.abi,
      //   signer
      // );
      // const txn = await DappContract.balanceOf(currentAccount);
      // console.log(txn);
      setIsLoading(false);
    };
    if (currentAccount) {
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return {
    isLoading,
    currentAccount,
    connectWalletAction,
  };
};
