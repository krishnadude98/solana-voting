const assert = require("assert");
const anchor = require("@coral-xyz/anchor");
const { PublicKey } = require("@solana/web3.js");
let _myAccount1 = null;

describe("election", () => {
  const ANCHOR_PROGRAM = anchor.workspace.Election;
  const programPair = anchor.web3.Keypair.generate();

  function getProgramInteraction() {
    const user = anchor.web3.Keypair.generate();
    const provider = new anchor.AnchorProvider(
      anchor.AnchorProvider.local().connection,
      new anchor.Wallet(user),
      {}
    );
    const program = new anchor.Program(
      ANCHOR_PROGRAM.idl,
      ANCHOR_PROGRAM.programId,
      provider
    );
    return { user: user, program: program, provider: provider };
  }

  async function addFunds(user, amount, provider) {
    const airdrop_tx = await provider.connection.requestAirdrop(
      user.publicKey,
      amount
    );
    await provider.connection.confirmTransaction(airdrop_tx);
  }

  const { user, program, provider } = getProgramInteraction(); //user1
  const {
    user: user2,
    program: program2,
    provider: provider2,
  } = getProgramInteraction(); //user2

  it("initializes the election account", async () => {
    const winners = 1;

    await addFunds(user, 1e10, provider);

    await program.methods
      .createElection(winners)
      .accounts({
        electionData: programPair.publicKey,
      })
      .signers([programPair])
      .rpc();

    const account = await program.account.electionData.fetch(
      programPair.publicKey
    );

    assert.equal(account.candidates.toNumber(), "0");
    assert.equal(account.winnersNum, winners);
    assert.equal(account.initiator.toBase58(), user.publicKey.toBase58());
  });
});
