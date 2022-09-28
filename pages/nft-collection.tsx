import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import styles from "../styles/Home.module.css";
import { useNFTs, useProgram } from "@thirdweb-dev/react/solana";

export default function NFTCollection() {
  const programQuery = useProgram(
    contractAddresses[1].address,
    "nft-collection"
  );
  const allQuery = useNFTs(programQuery.data);

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

        {!allQuery.isLoading ? (
          <div className={styles.nftBoxGrid}>
            {allQuery.data?.map((nft) => (
              <div className={styles.nftBox} key={nft.id?.toString() || ""}>
                <img src={nft.image || ""} className={styles.nftMedia} />
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
