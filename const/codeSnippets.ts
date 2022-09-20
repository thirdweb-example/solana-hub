const codeSnippets = {
  nftCollection: `import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { useConnection } from "@solana/wallet-adapter-react";

export default function NFTDrop() {
  const { connection } = useConnection();
  const [thirdweb, setThirdweb] = useState<ThirdwebSDK | null>(null);
  const [loadingNfts, setLoadingNfts] = useState<boolean>(true);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (connection) {
      const sdk = new ThirdwebSDK(connection);
      setThirdweb(sdk);
    }
  }, [connection]);

  useEffect(() => {
    if (thirdweb) {
      (async () => {
        const contract = await thirdweb.getNFTCollection(
          "{{contractAddress}}"
        );
        const ns = await contract.getAll();
        setNfts(ns);
      })();
    }
  }, [thirdweb]);

  return (
    <div>
      {!loadingNfts ? (
        <div className={styles.nftBoxGrid}>
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
require("@solana/wallet-adapter-react-ui/styles.css");

export default function NFTDrop() {
  const { connection } = useConnection();

  async function claimNft() {
    const thirdweb = new ThirdwebSDK(connection);
    const contract = await thirdweb.getNFTDrop("{{contractAddress}}");
    const tx = await contract?.claim();
  }

  return (
    <div>
        <img src={"yellow_star.png"} />
        {wallet.connected ? (
          <button onClick={claimNft}>
            {claiming ? "Claiming..." : "Claim NFT"}
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
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Token() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [thirdweb, setThirdweb] = useState<ThirdwebSDK | null>(null);
  const [totalSupply, setTotalSupply] = useState<string>("Loading...");
  const [balance, setBalance] = useState<string>("Loading...");

  // useSDK
  useEffect(() => {
    if (connection) {
      const sdk = new ThirdwebSDK(connection);
      setThirdweb(sdk);
    }
  }, [connection]);

  // ConnectWallet
  useEffect(() => {
    if (thirdweb && wallet.connected) {
      thirdweb.wallet.connect(wallet);
    }
  }, [thirdweb, wallet]);

  // useToken
  async function loadTokenContract() {
    return await thirdweb?.getToken("{{contractAddress}}");
  }

  // useTokenBalance
  useEffect(() => {
    if (thirdweb && wallet.connected) {
      (async () => {
        try {
          const token = await loadTokenContract();
          const b = await token?.balance();
          setBalance(b?.displayValue || "0");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [thirdweb, wallet]);

  // useTotalSupply
  useEffect(() => {
    if (thirdweb) {
      (async () => {
        try {
          const token = await loadTokenContract();
          const s = await token?.totalSupply();
          setTotalSupply(s?.displayValue || "0");
        } catch (error) {
          console.error(error);
        }
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
