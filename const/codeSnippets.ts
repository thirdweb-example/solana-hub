const codeSnippets = {
  nftCollection: `export default function NFTCollection() {
  const { connection } = useConnection();
  const sdk = useSDK(connection);
  const [nfts, setNfts] = useState<any[]>([]);
  
  useEffect(() => {
    if (connection) {
      (async () => {
        const contract = await sdk.getNFTCollection(
          "{{contractAddress}}"
        );
        const ns = await contract.getAll();
        setNfts(ns);
      })();
    }
  }, [connection]);

  return (
    <div>
      {nfts?.map((nft) => (
        <div key={nft.id.toString()}>
          <img src={nft.image} />
          <h3>{nft.name}</h3>
        </div>
      ))}
    </div>
  );
}`,

  nftDrop: `export default function NFTDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const sdk = useSDK(connection, wallet);

  const claimNft = async () => {
    const contract = await sdk?.getNFTDrop("{{contractAddress}}");
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

  token: `export default function Token() {
  const { connection } = useConnection();
  const sdk = useSDK(connection);
  const [totalSupply, setTotalSupply] = useState<string>("Loading...");

  useEffect(() => {
    if (sdk) {
      (async () => {
        const token = await sdk.getToken("{{contractAddress}}");
        const s = await token?.totalSupply();
        setTotalSupply(s?.displayValue || "0");
      })();
    }
  }, [sdk]);

  return (
    <div>
      <h3>Total Supply</h3>
      <p>{totalSupply}</p>
    </div>
  );
}`,
};

export default codeSnippets;
