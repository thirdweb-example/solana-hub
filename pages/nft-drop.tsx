import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import styles from "../styles/Home.module.css";
import { useProgram, useClaimNFT } from "@thirdweb-dev/react/solana";
import { useWallet } from "@solana/wallet-adapter-react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function NFTDrop() {
  const wallet = useWallet();
  const { program } = useProgram(contractAddresses[0].address, "nft-drop");
  const claim = useClaimNFT(program);

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
              href="https://portal.thirdweb.com/solana/programs/nft-drops"
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
          <button
            className={styles.mainButton}
            onClick={() =>
              claim.mutate(
                { amount: 1 },
                {
                  onError: (error) => {
                    console.error(error);
                    alert(
                      "Something went wrong. Check the console for more details."
                    );
                  },
                }
              )
            }
          >
            {claim.isLoading
              ? "Claiming..."
              : claim.isSuccess
              ? "Success!"
              : "Claim NFT"}
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
