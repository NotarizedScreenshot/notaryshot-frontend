import { fetchSigner } from '@wagmi/core';
import { ProcessIcon } from 'components';
import { sign } from 'crypto';
import { createContext, useContext, useState } from 'react';
import { useAccount, useContract, useProvider } from 'wagmi';
import notaryShotContract from 'contracts/screenshot-manager.json';
import { BigNumber, Contract } from 'ethers';
interface IContractContext {
  contract: any;
  nftId: string | null;
}

const contractContextInitValue: IContractContext = {
  contract: null,
  nftId: null,
};

export const ContractContext = createContext<IContractContext>(contractContextInitValue);

export const useContractContext = () => useContext(ContractContext);

export const ContractContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [nftId, setNftId] = useState<string | null>(null);
  const { address } = useAccount();
  fetchSigner().then((signer) => {
    console.log('signer', signer);
  });

  const provider = useProvider();
  console.log(provider);

  const contract = useContract({
    address: notaryShotContract.address,
    abi: notaryShotContract.abi,
    signerOrProvider: provider,
  });

  console.log(contract);

  contract!.on('Transfer', (...args) => {
    console.log('on transfer in preview', args);
    const [, ownerAddress, mintedNftId] = args as [string, string, BigNumber];
    console.log('results ownerAddress, mintedNftId: ', ownerAddress, mintedNftId.toString());
    if (ownerAddress.toLowerCase() === address?.toLowerCase()) {
      setNftId(mintedNftId.toString());
    }
  });
  contract!.on('SubmitTweetMint', (...args) => {
    console.log('on SubmitTweetMint in preview', args);
  });

  const value = {
    contract: null,
    nftId,
  };

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};
