import styles from "../styles/Home.module.css";
import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import { useProgram, useTokenSupply } from "@thirdweb-dev/react/solana";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Token() {
  const programQuery = useProgram(contractAddresses[2].address, "token");
  const balanceQuery = useTokenSupply(programQuery.data);

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div className={styles.detailPageContainer}>
          <h1>Token</h1>
          <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

          <p>Create your own digital currency</p>
          <p>
            <a
              className={styles.lightPurple}
              href="https://portal.thirdweb.com/pre-built-contracts/token"
            >
              Check out the documentation here.
            </a>
          </p>
        </div>

        <div className={styles.tokenGrid}>
          {/* Total Supply */}
          <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel}>Total Supply</h3>
            <p className={styles.tokenValue}>
              {balanceQuery.isLoading
                ? "Loading..."
                : balanceQuery.data?.displayValue}
            </p>
          </div>
        </div>
      </div>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
      {/* Code Snippet */}
      <h2>How It Works</h2>

      <CodeSnippet text={codeSnippets.token} />
    </div>
  );
}
