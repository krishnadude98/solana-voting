# Solana Voting

It create a voting system in solana blockchain
there are voters,candidates and initaor roles

- **Initiator** is the account that creates the election and controls the stages of election like application, voting, ending

  **Note:-Initator can only close the voting if the deadline is reached for the election**

- **Candidates** are the users that want to take part in the election

- **Voters** these are the users that will vote for the candidates the candidate having highes votes wins the election.

## Installation

Install my-project with yarn

```bash
  cd voting
  yarn install
```

## Features

- Program derived accounts are implemented for better security.
- Anchor is used for easy code implementation and security.

## Run Locally

Clone the project

install solana dovelopment kits and anchor

Open a terminal and run

```bash
  solana-test-validator
```

Open another terminal

```bash
  anchor build
```

After building create the address of contract using

```bash
  solana address -k target/deploy/election-keypair.json
```

Paste the address in Anchor.toml line 6

Update src/lib.rs

```bash

    declare_id!(["WITH_YOUR_GENERATED_ADDRESS"]);
```

Build Again

```bash
  anchor build
```

Deploy

```bash
  anchor deploy
```
