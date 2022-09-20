import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function NFTDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [thirdweb, setThirdweb] = useState<ThirdwebSDK | null>(null);
  const [claiming, setClaiming] = useState<boolean>(false);

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

  // useClaimNFT
  const claimNft = async () => {
    try {
      const contract = await thirdweb?.getNFTDrop(contractAddresses[0].address);
      setClaiming(true);
      const tx = await contract?.claim();

      alert("Minted NFT with transaction ID: " + tx);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check the console for more details.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div className={styles.detailPageContainer}>
          <h1>NFT Drop</h1>
          <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

          <p>
            <b>Batch upload</b> the metadata of your NFTs in CSV/JSON files.
          </p>
          <p>
            Set up claim conditions for others to mint your NFTs under those
            conditions!
          </p>
          <p>
            <a
              className={styles.lightPurple}
              href="https://portal.thirdweb.com/pre-built-contracts/nft-drop"
            >
              Check out the documentation here.
            </a>
          </p>
        </div>
        <img
          src={`/yellow_star.png`}
          alt={"Example NFT Image"}
          width={300}
          height={300}
        />

        {wallet.connected ? (
          <button className={styles.mainButton} onClick={claimNft}>
            {claiming ? "Claiming..." : "Claim NFT"}
          </button>
        ) : (
          <WalletMultiButton />
        )}
      </div>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
      <h2>How It Works</h2>

      <CodeSnippet text={codeSnippets.nftDrop} />
    </div>
  );
}
