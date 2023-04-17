const anchor = require('@project-serum/anchor');

const {SystemProgram} = anchor.web3;

const main = async () => {
  console.log("Iniciando testes...");

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;

  const baseAccount = anchor.web3.Keypair.generate();
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
  },
  signers: [baseAccount],
});


  console.log("Sua assinatura de transação:", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF Count", account.totalGifs.toString())

  await program.rpc.addGif("insira_o_link_aqui", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
},
});

account = await program.account.baseAccount.fetch(baseAccount.publicKey);
console.log("GIF Count", account.totalGifs.toString())

console.log("Gif list", account.gifList);

};


const runMain = async () => {
  try {
    await main();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
};

runMain();