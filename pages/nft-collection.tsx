import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { useConnection } from "@solana/wallet-adapter-react";
import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import styles from "../styles/Home.module.css";

export default function NFTCollection() {
  const { connection } = useConnection();
  const [loadingNfts, setLoadingNfts] = useState<boolean>(true);
  const [nfts, setNfts] = useState<any[]>([]);

  // useSDK
  useEffect(() => {
    if (connection) {
      (async () => {
        const sdk = new ThirdwebSDK(connection);
        const contract = await sdk.getNFTCollection(
          contractAddresses[1].address
        );
        const ns = await contract.getAll();
        setNfts(ns);
        setLoadingNfts(false);
      })();
    }
  }, [connection]);

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div className={styles.detailPageContainer}>
          <h1>NFT Collection</h1>
          <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

          <p>
            <b>Mint NFTs</b> directly into an NFT Collection!
          </p>

          <p>
            <a
              className={styles.lightPurple}
              href="https://portal.thirdweb.com/pre-built-contracts/nft-collection"
            >
              Check out the documentation here.
            </a>
          </p>
        </div>

        {!loadingNfts ? (
          <div className={styles.nftBoxGrid}>
            {nfts?.map((nft) => (
              <div className={styles.nftBox} key={nft.id.toString()}>
                <img src={nft.image} className={styles.nftMedia} />
                <h3>{nft.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
      <h2>How It Works</h2>

      <CodeSnippet text={codeSnippets.nftCollection} />
    </div>
  );
}
