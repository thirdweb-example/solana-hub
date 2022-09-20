import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "../styles/Home.module.css";
import contractAddresses from "../const/contractAddresses";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
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
    return await thirdweb?.getToken(contractAddresses[2].address);
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
            <p className={styles.tokenValue}>{totalSupply}</p>
          </div>

          {/* Balance */}
          <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel}>Your Balance</h3>

            {wallet.connected ? (
              <p className={styles.tokenValue}>{balance}</p>
            ) : (
              <WalletMultiButton />
            )}
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
