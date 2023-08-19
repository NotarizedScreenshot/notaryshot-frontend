import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import notaryShotContract from 'contracts/screenshot-manager.json';
import { createPublicClient, http } from 'viem';
import { polygon } from 'viem/chains';

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

  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });

  const setWatcher = () => {
    console.count('run set Watched');
    return publicClient.watchContractEvent({
      address: notaryShotContract.address as `0x${string}`,
      abi: notaryShotContract.abi,
      eventName: 'Transfer',
      onLogs: (logs) => {
        console.log('Contract on Transfer Event, log:', logs);

        const log = logs[0];

        const { args } = log as typeof log & { args: { tokenId: bigint; to: `0x${string}` } };

        console.log('ContractContextProvider useContractEvent, transfer event, args.to:', args.to.toLowerCase());
        console.log(
          'ContractContextProvider useContractEvent, transfer event, current address:',
          address?.toLowerCase(),
        );
        console.log(
          'ContractContextProvider useContractEvent, current address is equal to args.to: ',
          args.to.toLowerCase() === address?.toLowerCase(),
        );

        if (args.to.toLowerCase() === address?.toLowerCase()) {
          setNftId(args.tokenId.toString());
        } else {
          console.log('args.to is not equal to current address, args.to: ', args.to, 'current address: ', address);
        }
      },
    });
  };

  useEffect(() => {
    const unWatch = setWatcher();

    return () => {
      console.count('run useEffect return and unwatch Watched');
      unWatch();
    };
  }, [address]);

  const value = {
    contract: null,
    nftId,
  };

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};
