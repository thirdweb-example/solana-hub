import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { useConnection } from "@solana/wallet-adapter-react";
import contractAddresses from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";

export default function NFTDrop() {
  const { connection } = useConnection();
  const [thirdweb, setThirdweb] = useState<ThirdwebSDK | null>(null);
  const [loadingNfts, setLoadingNfts] = useState<boolean>(true);
  const [nfts, setNfts] = useState<any[]>([]);

  // useSDK
  useEffect(() => {
    if (connection) {
      const sdk = new ThirdwebSDK(connection);
      setThirdweb(sdk);
    }
  }, [connection]);

  // useNFTs
  useEffect(() => {
    if (thirdweb) {
      (async () => {
        try {
          const contract = await thirdweb.getNFTCollection(
            contractAddresses[1].address
          );
          const ns = await contract.getAll();
          setNfts(ns);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingNfts(false);
        }
      })();
    }
  }, [thirdweb]);

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
