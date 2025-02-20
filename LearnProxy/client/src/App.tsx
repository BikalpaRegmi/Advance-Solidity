import { useEffect, useState } from "react";
import "./App.css";
import dmabi from "./bytecode/diamondabi.json";
import setabi from "./bytecode/setmsgabi.json";
import getabi from "./bytecode/getmsgabi.json";
import getcountabi from "./bytecode/getmsgcountabi.json"
import { ethers } from "ethers";

interface ContractConnect {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [state, setState] = useState<ContractConnect>({
    account: null,
    provider: null,
    signer: null,
    contract: null,
  });

  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number>(0); // Add state for count
  const [input, setInput] = useState<string>("");

  const fetchMessage = async () => {
    if (!state.contract) {
      console.error("Contract is not initialized yet.");
      return;
    }

    try {
      const res: any = await state.contract.getMessage();
      setMessage(res);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const getCount = async () => {
    const res = await state.contract?.getMsgCount();
    setCount(Number(res));
    console.log(Number(res));
  };

  const handleAddMessage = async () => {
    if (!state.contract) {
      console.error("Contract is not initialized yet.");
      return;
    }

    try {
      const tx = await state.contract.setMessage(input);
      console.log("Transaction sent:", tx);
      await tx.wait();
      console.log("Transaction confirmed!");
      fetchMessage();
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const template = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed.");
      return;
    }

    try {
      const baseSepoliaChainId = "0x14a34"; // Base Sepolia chain ID (decimal 84532)

      // Request the user to switch network to Base Sepolia
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: baseSepoliaChainId }],
      });

      const contractAddress: string =
        "0xB8B99f6CF247c101F3164982F54A48bB3Fc34639";
      const contractAbi: any = [
        ...dmabi.abi,
        ...getabi.abi,
        ...setabi.abi,
        ...getcountabi.abi,
      ];

      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider: ethers.BrowserProvider = new ethers.BrowserProvider(
        window.ethereum
      );
      const signer: ethers.Signer = await provider.getSigner();
      const contract: ethers.Contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      setState({
        signer: signer,
        account: accounts[0],
        provider: provider,
        contract: contract,
      });

      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  useEffect(() => {
    template();
  }, []);

  useEffect(() => {
    if (state.contract) {
      fetchMessage();
      getCount();
    }
  }, [state.contract]); // Fetch message only after contract is set

  return (
    <>
      <div className="w-1/2 h-96 align-bottom m-auto">
        <span>
          <input
            type="text"
            className="border-2 border-amber-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
          />
          <button
            onClick={handleAddMessage}
            className="border-2 border-green-500 rounded-md px-1 bg-green-600"
          >
            Submit
          </button>
        </span>
        <h1 className="answer text-3xl font-bold mt-3">{message}</h1>
        <h1 className="answer text-3xl font-bold mt-3">{count!}</h1>
      </div>
    </>
  );
}

export default App;
