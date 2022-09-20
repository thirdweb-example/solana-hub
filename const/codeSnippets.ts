const codeSnippets = {
  nftCollection: `import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { useConnection } from "@solana/wallet-adapter-react";

export default function NFTCollection() {
  const { connection } = useConnection();
  const [loadingNfts, setLoadingNfts] = useState<boolean>(true);
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    if (connection) {
      (async () => {
        const sdk = new ThirdwebSDK(connection);
        const contract = await sdk.getNFTCollection(
          "{{contractAddress}}"
        );
        const ns = await contract.getAll();
        setNfts(ns);
        setLoadingNfts(false);
      })();
    }
  }, [connection]);

  return (
    <div>
      {!loadingNfts ? (
        <div>
          {nfts?.map((nft) => (
            <div key={nft.id.toString()}>
              <img src={nft.image} />
              <h3>{nft.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}`,

  nftDrop: `import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function NFTDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [thirdweb, setThirdweb] = useState<ThirdwebSDK | null>(null);

  useEffect(() => {
    if (connection) {
      const sdk = new ThirdwebSDK(connection);
      setThirdweb(sdk);
    }
  }, [connection]);

  useEffect(() => {
    if (thirdweb && wallet.connected) {
      thirdweb.wallet.connect(wallet);
    }
  }, [thirdweb, wallet]);

  const claimNft = async () => {
    const contract = await thirdweb?.getNFTDrop("{{contractAddress}}");
    const tx = await contract?.claim();
  }

  return (
    <div>
      <img src={"/yellow_star.png"}/>

      {wallet.connected ? (
        <button onClick={claimNft}>
          Claim NFT
        </button>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
}`,

  token: `import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Token() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [thirdweb, setThirdweb] = useState<ThirdwebSDK | null>(null);
  const [totalSupply, setTotalSupply] = useState<string>("Loading...");
  const [balance, setBalance] = useState<string>("Loading...");

  useEffect(() => {
    if (connection) {
      const sdk = new ThirdwebSDK(connection);
      setThirdweb(sdk);
    }
  }, [connection]);

  useEffect(() => {
    if (thirdweb && wallet.connected) {
      thirdweb.wallet.connect(wallet);
    }
  }, [thirdweb, wallet]);

  async function loadTokenContract() {
    return await thirdweb?.getToken("{{contractAddress}}");
  }

  useEffect(() => {
    if (thirdweb && wallet.connected) {
      (async () => {
        const token = await loadTokenContract();
        const b = await token?.balance();
        setBalance(b?.displayValue || "0");
      })();
    }
  }, [thirdweb, wallet]);

  useEffect(() => {
    if (thirdweb) {
      (async () => {
        const token = await loadTokenContract();
        const s = await token?.totalSupply();
        setTotalSupply(s?.displayValue || "0");
      })();
    }
  }, [thirdweb]);

  return (
    <div>
      <div>
        <h3>Total Supply</h3>
        <p>{totalSupply}</p>
      </div>
      <div>
        <h3>Your Balance</h3>
        {wallet.connected ? (
          <p>{balance}</p>
        ) : (
          <WalletMultiButton />
        )}
      </div>
    </div>
  );
}`,
};

export default codeSnippets;
