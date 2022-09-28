const codeSnippets = {
  nftCollection: `export default function NFTCollection() {
  const program = useProgram(programAddress, "nft-collection");
  const nfts = useNFTs(program.data);

  return (
    <div>
      {nfts.data?.map((nft) => (
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
  const program = useProgram(programAddress, "nft-drop");
  const claim = useClaimNFT(program.data);
  const quantityToClaim = 1;

  return (
    <div>
      <img src={"/yellow_star.png"}/>
      {wallet.connected ? (
        <button onClick={() => claim.mutate(quantityToClaim)}>
          {claim.isLoading ? "Claiming..." : "Claim NFT"}
        </button>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
}`,

  token: `export default function Token() {
  const program = useProgram(programAddress, "token");
  const supply = useTokenSupply(program.data);

  return (
    <div>
      <h3>Total Supply</h3>
      <p>{supply.isLoading ? "Loading..." : supply.data?.displayValue}</p>
    </div>
  );
}`,
};

export default codeSnippets;
