import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import styles from "../styles/Home.module.css";
import { useNFTs, useProgram } from "@thirdweb-dev/react/solana";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";

export default function NFTCollection() {
  const { program } = useProgram(
    contractAddresses[1].address,
    "nft-collection"
  );
  const allQuery = useNFTs(program);

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
              href="https://portal.thirdweb.com/solana/programs/nft-collections"
            >
              Check out the documentation here.
            </a>
          </p>
        </div>

        {!allQuery.isLoading ? (
          <div className={styles.nftBoxGrid}>
            {allQuery.data?.map((nft) => (
              <div
                className={styles.nftBox}
                key={nft.metadata.id?.toString() || ""}
              >
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
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
