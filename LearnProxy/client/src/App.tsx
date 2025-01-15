import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./byteCodes/abi.json";

interface EthereumState {
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
  provider: ethers.BrowserProvider | null;
  account: string | null;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [state, setState] = useState<EthereumState>({
    signer: null,
    contract: null,
    provider: null,
    account: null,
  });
  const [data, setData] = useState<string>();
  const [name, setName] = useState<string>();

  const template = async () => {
    try {
      const contractAddress: string =
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const contractAbi: any = abi.abi;

      if (window.ethereum) {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
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

        setState({ signer, contract, provider, account: accounts[0] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    const updatedName: string = await state.contract?.GetValue();
    console.log(updatedName);
    setName(updatedName);
  };
  
  useEffect(() => {
    template();
  }, []);

  useEffect(() => {
    getData();
  }, [state.contract]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.contract) {
      await state.contract.toSet(data);
    } else {
      throw new Error("Contract Not Found");
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData(e.target.value)
          }
          className="inputType"
          type="text"
          placeholder="Plz enter name"
        />
        <button type="submit"> Submit </button>
      </form>
      <h1>{name!}</h1>
    </div>
  );
}

export default App;
