// import { fetchSigner } from '@wagmi/core';
import { createContext, useContext, useState } from 'react';
// import { useAccount } from 'wagmi';
import { useContractEvent, useAccount } from 'wagmi';
import notaryShotContract from 'contracts/screenshot-manager.json';

// import { BigNumber } from 'ethers';
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

  useContractEvent({
    address: notaryShotContract.address as `0x${string}`,
    abi: notaryShotContract.abi,
    eventName: 'Transfer',
    listener([log]) {
      console.log('Transfer', log);

      const { args } = log as typeof log & { args: { tokenId: bigint; to: `0x${string}` } };

      args.tokenId.toString();

      console.log('Transfer', args, args.tokenId, typeof args.tokenId, args.tokenId.toString());

      if (args.to.toLowerCase() === address?.toLowerCase()) {
        setNftId(args.tokenId.toString());
      }
    },
  });

  // fetchSigner().then((signer) => {
  //   console.log('signer', signer);
  // });

  // const provider = useProvider();
  // console.log(provider);

  // const contract = useContract({
  //   address: notaryShotContract.address,
  //   abi: notaryShotContract.abi,
  //   signerOrProvider: provider,
  // });

  // console.log(contract);

  // contract!.on('Transfer', (...args) => {
  //   console.log('on transfer in preview', args);
  //   const [, ownerAddress, mintedNftId] = args as [string, string, BigNumber];
  //   console.log('results ownerAddress, mintedNftId: ', ownerAddress, mintedNftId.toString());

  // });
  // contract!.on('SubmitTweetMint', (...args) => {
  //   console.log('on SubmitTweetMint in preview', args);
  // });

  const value = {
    contract: null,
    nftId,
  };

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};
