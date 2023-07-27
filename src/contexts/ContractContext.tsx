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
      console.log('Contract on Transfer Event, log:', log);

      const { args } = log as typeof log & { args: { tokenId: bigint; to: `0x${string}` } };

      args.tokenId.toString();

      if (args.to.toLowerCase() === address?.toLowerCase()) {
        setNftId(args.tokenId.toString());
      }
    },
  });


  const value = {
    contract: null,
    nftId,
  };

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};
