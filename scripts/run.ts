import { Signer } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
  let accounts: Signer[];
  accounts = await ethers.getSigners();

  const epicTokenFactory = await ethers.getContractFactory("EPICToken");
  const epicToken = await epicTokenFactory.deploy("EPIC Token", "EPIC");
  console.log(`epicToken`, epicToken.address);
  const gameContractFactory = await ethers.getContractFactory("NFTEpicGame");
  const gameContract = await gameContractFactory.deploy(
    // characterName
    ["Iron Man", "Thor", "Spider Man", "Captain America"],
    // characterImageURI
    [
      "https://ehnwlorqkxqitvbn7esxphbehq5hsqr2qimt4n2iuwc2p2sc33va.arweave.net/IdtlujBV4InULfkld5wkPDp5QjqCGT43SKWFp-pC3uo",
      "https://vmkhvalx47u6n2omdvk3phl4eavs7dk4yjxjmpuv46bo4pidllua.arweave.net/qxR6gXfn6ebpzB1Vt518ICsvjVzCbpY-leeC7j0DWug",
      "https://cdezqunbfyr4dwr4jcbtgjvgnzzo32xau4lkw52jkiz73phudu7a.arweave.net/EMmYUaEuI8HaPEiDMyambnLt6uCnFqt3SVIz_bz0HT4",
      "https://zwhfro26bgjatdp3biqu66vllqgmtelgmzykx3d4xe3exveatadq.arweave.net/zY5Yu14JkgmN-wohT3qrXAzJkWZmcKvsfLk2S9SAmAc",
    ],
    // characterMaxHp
    [200, 250, 300, 250],
    // characterAttacks
    [
      [0, 4, 5],
      [1, 6, 7],
      [0, 2, 3],
      [0, 1, 8],
    ],
    "Thanos",
    "https://omifnpbr75msemzvrgk5gddyvkqdp3myeuuem62hsmhkulixy57a.arweave.net/cxBWvDH_WSIzNYmV0wx4qqA37ZglKEZ7R5MOqi0Xx34",
    100000,
    20,
    epicToken.address
  );
  await gameContract.deployed();
  console.log(`gameContract`, gameContract.address);

  let txn;
  txn = await gameContract.addAttacks(
    // attackNames
    [
      "Punch",
      "Kick",
      "Spider Attack",
      "Web Shooter",
      "Missile Attack",
      "Lazer Attack",
      "Mjollnir Attack",
      "Thunder Attack",
      "KO Attack",
    ],
    // attackImages
    [
      "https://ry7l7etlze3wyodjnsjmf6j2q43srt5ltlnokkdyrmcxiageafga.arweave.net/jj6_kmvJN2w4aWySwvk6hzcoz6ua2uUoeIsFdADEAUw",
      "https://v22fc4ehcq6miag3kawenxc2kq2r6pjejzuazybpchz5itilqcza.arweave.net/rrRRcIcUPMQA21AsRtxaVDUfPSROaAzgLxHz1E0LgLI",
      "https://4np45gdngajiny4ly26permsxt6do5phra5jglaxhh3zimoddhya.arweave.net/41_OmG0wEobji8a88kWSvPw3deeIOpMsFzn3lDHDGfA",
      "https://j53wm3h5bx676sehzb7y4lzdnmtuty2uqcmc5gjiwqps23dwevnq.arweave.net/T3dmbP0N_f9Ih8h_ji8jaydJ41SAmC6ZKLQfLWx2JVs",
      "https://homnlc4euq77db4yodsemzen46aarezcbzxwqkojo77qoyg3d6uq.arweave.net/O5jVi4SkP_GHmHDkRmSN54AIkyIOb2gpyXf_B2DbH6k",
      "https://mxmjs2dncoa6oh64cpr4gamw3c225lraqn6odxgajzjequch6mka.arweave.net/ZdiZaG0Tgecf3BPjwwGW2LWuriCDfOHcwE5SSFBH8xQ",
      "https://jibocdxv5ciijoo6guti2vegzrqkb3tcaqsezzhqteesnizi4tyq.arweave.net/SgLhDvXokIS53jUmjVSGzGCg7mIEJEzk8JkJJqMo5PE",
      "https://elddsmfignbvarionqtikrrtkgg6udr5csyz45iuiht277rtk5ma.arweave.net/IsY5MKgzQ1BFDmwmhUYzUY3qDj0UsZ51FEHnr_4zV1g",
      "https://j3gk5r6iw6lvrkyhvtda4fxe6fzodj3r7mnvpk55ndemebg3wd3a.arweave.net/Tsyux8i3l1irB6zGDhbk8XLhp3H7G1ervWjIwgTbsPY",
    ],
    // attackDamages
    [50, 60, 55, 65, 65, 50, 60, 65, 70],
    // attackIndexes
    [0, 1, 2, 3, 4, 5, 6, 7, 8]
  );
  await txn.wait();

  txn = await gameContract.addSpecialAttacks(
    // specialAttackNames
    ["Bomb Attack", "Explosion Attack", "Nuclear Attack", "Epic Attack"],
    // specialAttackImages
    [
      "https://cmb72ickyadaj3jnq3nl45a3vikvnzosi3swm2fpser6ersja5ya.arweave.net/EwP9IErABgTtLYbavnQbqhVW5dJG5WZor5Ej4kZJB3A",
      "https://65whlo6gr6wgb4tl3f3owmmoawgu5nv36qspm7yf5ic4m5stpkkq.arweave.net/92x1u8aPrGDya9l26zGOBY1Otrv0JPZ_BeoFxnZTepU",
      "https://hmf3tblzmyqs35jaw5ja3kfdgngxif6hbsk2hlr4tqhpdfpoiaeq.arweave.net/Owu5hXlmIS31ILdSDaijM010F8cMlaOuPJwO8ZXuQAk",
      "https://lwu7j5gmtjncwjrzpzuhdoweifzpwrvfmmcfvq66nyzhmocg5ixq.arweave.net/Xan09MyaWismOX5ocbrEQXL7RqVjBFrD3m4ydjhG6i8",
    ],
    // specialAttackDamages
    [80, 100, 110, 140],
    // specialAttackPrices
    [
      ethers.utils.parseEther("4.5"),
      ethers.utils.parseEther("5.5"),
      ethers.utils.parseEther("7"),
      ethers.utils.parseEther("10"),
    ],
    // specialAttackIndexes
    [0, 1, 2, 3]
  );
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(`err`, err);
    process.exit(1);
  }
};

runMain();
