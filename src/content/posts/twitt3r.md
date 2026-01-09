---
title: Twitt3r.xyz
date: "2022-08-24"
description: Building a decentralized Twitter clone on Ethereum
image: https://github.com/maxpetretta/twitt3r.xyz/blob/master/demo.gif?raw=true
categories: ["crypto"]
---

<img src="https://github.com/maxpetretta/twitt3r.xyz/blob/master/demo.gif?raw=true" alt="A quick 60 second demo of twitt3r.xyz" width="650" height="458" loading="eager" class="mx-auto">

**Introducing [Twitt3r.xyz](https://twitt3r.xyz), a decentralized Twitter clone built on the Ethereum blockchain.** Live now on [Goerli](https://goerli.etherscan.io/address/0x3493B7ABE5e6E142D632e6596bc550A73c87Ee79) and [Ropsten](https://ropsten.etherscan.io/address/0x3493B7ABE5e6E142D632e6596bc550A73c87Ee79) testnets. Connect your wallet, send tw33ts, and check out user profiles (with help from [ENS](https://ens.domains/)).

Interested? Great! Let's explore how we got here...

## Prelude

Over the last year, I've grown more interested in the web3 space, particularly the ecosystem surrounding [Ethereum](https://ethereum.org/en/). I plan on doing a deeper dive on the "why" at a later point, this post will focus more on the "what/how".

Brief summary: Ethereum is a [Proof-of-Work](https://en.wikipedia.org/wiki/Proof_of_work) blockchain (although that may [soon change](https://ethereum.org/en/upgrades/merge/)) that enables developers to write and deploy "smart contracts". These programs can then be freely used by anyone. To learn what that entails, I decided to build a little side project using smart contracts, and some newer frontend libraries for interacting with them.

But what to build? It's easy to go with the classic to-do app, but I wanted to pick something uniquely suited to blockchain. Let's generalize _heavily_ here, and go over some strengths of blockchains:

- Unique user identities (wallets) by default
- Open protocols that can be used/built upon by anyone
- Deploy once for global availablity

To me, the obvious choice for this tech was Twitter. It does seem like a great fit, Twitter _should_ be a protocol, much like [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol). This makes even more sense after realizing that some pretty core Twitter features were [invented by the community](https://qz.com/135149/the-first-ever-hashtag-reply-and-retweet-as-twitter-users-invented-them/), through [third-party clients](https://www.theverge.com/2018/8/16/17699626/twitter-third-party-apps-streaming-api-deprecation) built on an open API.

## Smart Contracts

Now that we know what we want to build, let's look at how we can build it. The contract is the perfect place to start, as it forms the core of our app.

There are several languages for smart contracts, the most popular being [Solidity](https://docs.soliditylang.org/en/v0.8.15/#), a C-like curly bracket language. There's also [Vyper](https://vyper.readthedocs.io/en/stable/), which is closer to Python. I chose to go with Solidity, but either would work just fine.

Here's a basic hello world in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract HelloWorld {
    string private name;

    constructor(string memory _name) {
        name = _name;
    }

    function sayHello() public view returns (string memory) {
        string memory message = string.concat("Hello ", name, "!");
        return message;
    }
}
```

If you have experience with C++ or Java, this should look pretty familiar. A few things worth noting:

- Line 2: In Solidity, we have to specify the version of the compiler we want to use directly in the source code. Here we set the compiler to version 0.8.12, or any subsequent minor release.
- Line 8: The only time we modify the `name` variable is during the contract constructor call. More on that later.
- Line 11: `sayHello()` is marked as a `public view` function. This means that the function can be called by anyone (public), and does not modify the state of the contract (view).
- Lines 7, 11, & 12: You'll notice that wherever we use the `string` type, we follow it with `memory`. There's three types of memory in the [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/): memory, storage, and calldata. `memory` indicates that a variable need only exist while it's surrounding function is running, after which it can be discarded. If we used the permanent `storage` type, it would cost significantly more gas, increasing transaction fees.

And that's it! If you deployed this contract, you'd have global "protocol" that anyone could interact with to say hello to you. But _only you_, since it's impossible to change the `name` property!

That's because we forgot to add a setter method to update `name`. We can't add one after the fact due to Ethereum being **immutable**, meaning you cannot change past transactions or deployments. This should scare pretty much every developer, but it's why [testing](https://ethereum.org/en/developers/docs/smart-contracts/testing/#benefits-of-smart-contract-testing) and [audits](https://smartcontractaudits.com/audit-providers/companies/1) are commonplace in smart contract development.

### The Twitt3r Contract

Let's look at a few sections of the Twitt3r contract in detail. If you'd like to see the whole thing, check it out on [GitHub here](https://github.com/maxpetretta/twitt3r.xyz/blob/master/hardhat/contracts/Twitt3r.sol).

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "hardhat/console.sol"; // DEBUG

/**
 * @title Twitt3r
 * @author Max Petretta (maxpetretta.eth)
 * @notice A decentralized version of Twitter, built on the Ethereum blockchain
 * @dev Not audited!
 */
contract Twitt3r is Ownable, Pausable {
    uint8 public odds;
    uint256 public price;
    uint256 public jackpot;
    address public lastWinner;
    uint256 private seed;

    struct Tweet {
        address from;
        uint256 timestamp;
        string message;
        bool deleted;
        uint256 replyID;
        uint256 retweetID;
    }

    /**
      * @notice Deploys the Twitt3r contract with the given settings
      * @param _odds The percentage (0 - 100) chance of a jackpot payout
      * @param _price The price to send a tweet
      * @param _jackpot The value of the jackpot to pay out
      */
      constructor(uint8 _odds, uint256 _price, uint256 _jackpot) payable {
          odds = _odds;
          price = _price;
          jackpot = _jackpot;
      }
...
```

- Lines 1, 2, 11: For the Twitt3r contract, we import and inherit from the [OpenZeppelin](https://www.openzeppelin.com/contracts) `Ownable` and `Pausable` contracts. These give the contract owner some additional control over Twitt3r after it's deployed. We can restrict updating state variables, like the price to tweet or changing lottery odds, to just the owner address.
- Lines 18-25: The main data structure is the `Tweet` struct, which contains a collection of properties that describe new tweets sent by users. The interesting one is the `deleted` flag. Since we can never _really_ delete something from the blockchain (remember, immutable!), we need some other way to indicate when a user has deleted a tweet. This flag tells us that we should hide the tweet in the UI, although the data is still there on chain if you were to look for it.
- Line 33: The constructor is similar to the HelloWorld one we saw earlier, with one difference. We've added the `payable` keyword, which tells the EVM that this contract can accept payments from users. By default, we set a (small) price to send tweets to ensure that the contract won't be spammed.

```solidity
/**
  * @notice Send a message (tweet) to the contract
  * @param _message The sender's message to post
  * @param _replyID The ID of the tweet being replied to, 0 for top-level tweets
  * @param _retweetID The ID of the tweet being resent, 0 for top-level tweets
  */
function newTweet(
    string memory _message,
    uint256 _replyID,
    uint256 _retweetID
) public payable whenNotPaused {
    if (msg.value < price) revert InvalidPrice();
    if (bytes(_message).length > 280) revert InvalidMessage();
    if (lastTweetedAt[msg.sender] + 1 minutes >= block.timestamp)
        revert SenderCooldown();

    console.log("%s has tweeted!", msg.sender); // DEBUG
    lastTweetedAt[msg.sender] = block.timestamp;
    tweets[id] = Tweet(
        msg.sender,
        block.timestamp,
        _message,
        false,
        _replyID,
        _retweetID
    );
    tweetIDs.push(id);

    // Check if the sender has won the jackpot
    checkLottery(payable(msg.sender));

    // Alert subscribers to the new tweet transaction
    emit NewTweet(
        id,
        msg.sender,
        block.timestamp,
        _message,
        false,
        _replyID,
        _retweetID
    );
    id++;
}
```

- Lines 12-15: `newTweet()` will be one of the most called functions in our contract, so it's important to guard against bad actors. One way we can do this is with `revert` checks. When a new tweet is sent, we check if the sender paid the correct price, if their message is less than the character limit, and whether they are still on cooldown from their last tweet. If any of these conditions evaluate to true, the transaction will revert and the contract won't be updated.
- Line 30: Twitt3r has a lottery component built into it, which should incentivize users to post more often. On each tweet, the contract checks to see if the `msg.sender` (or user) has randomly won the jackpot amount. We'll look at this soon.
- Lines 33-41: After a new tweet is sent, we need a way to alert the UI that there is new information to display. [Events](https://docs.soliditylang.org/en/v0.8.16/contracts.html?highlight=event#events) are a logging system built into the EVM, and can also double as a cheap data store. Our frontend client can subscribe to the contract to listen for these events.

```solidity
/**
  * @notice Check whether the last sender won the lottery, based on the set odds
  * @dev Uses a simple RNG method based on block difficulty and timestamp, could be improved
  * @param _sender The most recent tweet sender
  */
function checkLottery(address payable _sender) private {
    if (address(this).balance < jackpot) revert InsufficientBalance();

    uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
    seed = randomNumber;

    console.log("Random # generated: %s", randomNumber); // DEBUG

    if (randomNumber < odds) {
        console.log("%s has won!", msg.sender); // DEBUG

        (bool sent, ) = _sender.call{value: jackpot}("");
        if (!sent) revert WithdrawalFailed();
        emit WonLottery(_sender, jackpot);
    }
}
```

- Lines 9-10: As previously discussed, Twitt3r contains a lottery function to randomly pay out users of the protocol. As it turns out, getting true randomness on a deterministic blockchain is a _really difficult problem_. Here's [a great SO answer](https://ethereum.stackexchange.com/a/207) on the topic, if you are interested. For our use case, a simpler method will suffice: We can get a pseudo-random number by using a combination of hard-to-predict values, such as the `block.difficulty` and `block.timestamp`. We also add in a random `seed` value, which is set inside the contract itself. This basic RNG can be used to check whether the user has won a jackpot.

That about covers the contract! The rest of the code is dedicated to modifying existing tweets, broadcasting events, and getters/setters for the various contract properties.

### Testing Your Contract

A critical part of the development stack that has gone unmentioned so far is [Hardhat](https://hardhat.org/). Hardhat lets us simulate a local version of Ethereum, allowing us to test and debug our contract before deploying to mainnet.

Remember, thoroughly testing all of the functions within your contract is _strongly encouraged_. We can write unit tests with [Chai assertions](https://hardhat.org/hardhat-chai-matchers/docs/overview), and Hardhat will run them against a local copy of our contract. To run tests, call `npx hardhat test` while your local environment is active.

Here's the test cases for the `newTweet()` function:

```javascript
describe("New tweets", function () {
  it("Should allow users to tweet", async function () {
    const { twitt3r, owner, price } = await loadFixture(twitt3rFixture)
    await expect(twitt3r.connect(owner).newTweet("Test message", 0, 0, price)).to.emit(twitt3r, "NewTweet")
  })

  it("Should not allow users to tweet when paying the wrong price", async function () {
    const { twitt3r, owner } = await loadFixture(twitt3rFixture)
    await expect(
      twitt3r.connect(owner).newTweet("Test message", 0, 0, { value: hre.ethers.utils.parseEther("0") }),
    ).to.be.revertedWithCustomError(twitt3r, "InvalidPrice")
  })

  it("Should not allow users to tweet with more than 280 characters", async function () {
    const { twitt3r, owner, price } = await loadFixture(twitt3rFixture)
    await expect(
      twitt3r
        .connect(owner)
        .newTweet(
          "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
          0,
          0,
          price,
        ),
    ).to.be.revertedWithCustomError(twitt3r, "InvalidMessage")
  })

  it("Should not allow users to tweet within the 1 minute cooldown", async function () {
    const { twitt3r, owner, price } = await loadFixture(twitt3rFixture)
    await twitt3r.connect(owner).newTweet("Test message", 0, 0, price)
    await expect(twitt3r.newTweet("Second message", 0, 0, price)).to.be.revertedWithCustomError(
      twitt3r,
      "SenderCooldown",
    )
  })
})
```

We can test our functions in both the positive and negative cases, making sure that the `revert` conditions we set earlier act as expected. Here's the result of running all of our tests:

![Terminal output of running hardhat tests on Twitt3r](/images/hardhat-tests.png)

With a passing suite of tests, we can protect from the most glaring contract issues. There's a lot more we could cover on the contract side, but it's time to move on. Feel free to poke around in the [GitHub repo](https://github.com/maxpetretta/twitt3r.xyz/tree/master/hardhat).

## Frontend UI

After we have a working contract, we'll typically want an easy, intuitve way to interact with it. Sure, you could try to use [Etherscan](https://etherscan.io/) for everything, but it's not the most pleasant experience. So let's build a website!

I'll skip over the core stack of [React](https://reactjs.org/), [Next.js](https://nextjs.org/), and [Tailwind CSS](https://tailwindcss.com/). If you'd like to read more about those, be sure to check out my post on [building this blog](https://maxpetretta.com/blog/tech-stack)!

The first thing new users will need to do on Twitt3r is connect their wallet. Fortunately, [RainbowKit](https://www.rainbowkit.com/) makes this incredibly easy:

![A screenshot of the RainbowKit UI](/images/rainbowkit.png)

> Image courtesy of Rainbow.me

- Supports all major wallet providers
- Easy to configure multi-chain support
- Adapts from desktop to mobile
- Built-in light/dark themes, or customize your own

I could go on, but it really is the easiest way to connect a wallet.

### Contract Hooks

Once users are connected, they are ready to send, reply to, and retweet others. All of those actions have a corresponding contract function that needs to be called, so we will need a library to handle that. The two largest players here are [web3.js](https://web3js.readthedocs.io/en/v1.7.5/) and [ethers.js](https://docs.ethers.io/v5/). web3 is the older library, and it operates under a single object model, where there is only one "node" that performs all read/write actions.

Ethers, on the other hand, separates concerns into two classes: providers and signers. An example why this is desirable: separately using an outside provider (like [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/)) to pull information from the chain, but still having the user sign transactions locally. Plus, Ethers natively supports the [Ethereum Name Service (ENS)](https://ens.domains/), which will be useful for constucting user profiles.

With these things in mind, I decided to go with ethers.js. Let's look at the code for sending a new tweet to our contract:

```javascript
/**
 * Submit a new tweet to the contract
 */
const sendTweet = async () => {
  try {
    const provider = await props.loadProvider()
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    const txn = await contract.tweet(message, {
      value: ethers.utils.parseUnits("0.0002"),
      gasLimit: 300000,
    })

    await txn.wait()
    console.debug("Tweeted --", txn.hash)
  } catch (error) {
    console.error("Transaction failed --", error)
  }
```

This is _okay_, but it is annoying to have to retrieve the provider/signer at the start of every contract interaction. Additionally, what about things like auto refreshing, caching, and error handling? Do we would need to build all of that ourselves?

Enter [wagmi.sh](https://wagmi.sh/). wagmi is a React hooks library built on top of ethers.js, and it's seriously awesome. For just about any interaction you could think of, wagmi already has a hook built out for you. For instance, here's how error handling is done:

```javascript
const { write: newTweet } = useContractWrite(
  {
    addressOrName: contractAddress,
    contractInterface: contractABI,
  },
  "newTweet",
  {
    onSuccess(data) {
      console.debug("Tweeted --", data.hash)
    },
    onError(error) {
      console.error("Transaction failed --", error)
    },
  },
)

/**
 * Submit a new tweet to the contract
 */
const sendTweet = () => {
  try {
    newTweet({
      args: [message.toString(), 0, 0],
      overrides: { value: ethers.utils.parseEther(price) },
    })
  } catch (error) {
    console.error("Contract call failed --", error)
  }
}
```

Now we can provide specific error messages before we call the contract, when a transaction has failed, or alert users after a successful tweet. I find the added flexibility is worth the additional lines of code. And this is just scratching the surface, there's [tons of other properties](https://wagmi.sh/docs/hooks/useContractWrite) to explore.

### User Profiles

The last piece of the puzzle for a social media site is storing user profile information. Typically, users will want to set a custom avatar, have a short bio, and maybe add some links to their other socials. We _could_ take in this information as a part of the Twitt3r contract, but that would not be very cost-effective. In keeping with the ethos of Ethereum, we should look for another protocol that already contains all of the metadata we need. Of course, I am talking about ENS.

The [Ethereum Name Service](https://ens.domains/) is the username, avatar, and profile of web3. It allows you to assign a human-readable name to any wallet address, and users can add any number of other fields to share with web3 applications. As an example, here is what my ENS profile looks like:

![A screenshot of the author's ENS profile page](/images/ens-profile.png)

You can see that I've set a profile picture, added a short bio, and linked to a bunch of different social networks. We can make use of all of this information on Twitt3r, which is actually quite easy thanks to wagmi and ethers. Let's look at how to pull this data:

```javascript
const router = useRouter()
const { address: address } = router.query
const [ens, setEns] = useState(address)
const [avatar, setAvatar] = useState()
const [description, setDescription] = useState("No ENS description found...")

const { data: name, refetch: nameRefetch } = useEnsName({
  address: address,
  enabled: false,
  onSuccess(data) {
    setEns(data ? data : address)
  },
})

const { refetch: avatarRefetch } = useEnsAvatar({
  addressOrName: address,
  enabled: false,
  onSuccess(data) {
    if (data) setAvatar(data)
  },
})

const { refetch: resolverRefetch } = useEnsResolver({
  name: name,
  enabled: false,
  onSuccess(data) {
    data.getText("description").then((value) => {
      if (value) setDescription(value)
    })
  },
})

/**
 * On page load, fetch the ENS profile details (if it exists)
 */
useEffect(() => {
  if (address) {
    nameRefetch()
    avatarRefetch()
  }
  if (ens) {
    resolverRefetch()
  }
}, [address, ens, nameRefetch, avatarRefetch, resolverRefetch])
```

wagmi already has built in hooks for getting the name and avatar of a given wallet address, and a general purpose resolver to fetch other fields of the profile. For Twitt3r's profile page, all we need is an address; if an ENS profile exists, wagmi will pull the information for us. We also make use of the `refetch` promise here, since the default Next.js router may not return the wallet address before page load.

## Wrapping Up

That's about it! You now have all of the core components to build your own Twitter clone on Ethereum. And because the Twitt3r contract is deployed on a public blockchain, you can build your own frontend while still using the same exact dataset. That's the power of building open protocols.

### Helpful Resources

I've gone through a lot of different tutorials to learn web3 development. If you'd like to go deeper with this new technology stack, here are some of the resources I recommend:

- [buildspace.so](https://buildspace.so/): Cohort-based introductory projects to web3 (Ethereum, Polygon, & Solana)
- [CryptoZombies](https://cryptozombies.io/en/course/): Mini-lessons in Solidity development, testing, and frontend development
- [Full Stack Ethereum Development](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13) by [Nadar Dabit](https://twitter.com/dabit3): An end-to-end hello world and ERC20 project using React, Hardhat, and Solidity
- [Speed Run Ethereum](https://speedrunethereum.com/) by [Austin Griffith](https://twitter.com/austingriffith): Self-guided project series, utilizing the [Scaffold-ETH](https://docs.scaffoldeth.io/scaffold-eth/) software stack
- [Full Blockchain, Solidity, & Web3 Course](https://github.com/smartcontractkit/full-blockchain-solidity-course-js) by [Patrick Collins](https://twitter.com/PatrickAlphaC): Comprehensive 32 hour (!!!) course covering Ethereum, Solidity, Hardhat, and much more!

Thanks for reading! If you have any questions, feel free to [reach out to me on Twitter](https://twitter.com/maxpetretta) (the real one!)
