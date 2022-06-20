import {BigNumber, ethers} from 'ethers';
export interface DappContextProps{
  currentAccount: string|null;
  isLoading: boolean;
  currentBalance:string;
  currentCharacter: CharacterProps;
  defaultCharactersList: CharacterProps[];
  hasCharacter:boolean;
  gameContract:ethers.Contract | null;
  allAttacks: AttackProps[];
  allSpecialAttacks: SpecialAttackProps[];
  bigBoss: BigBoss;
  error:string;
  connectWalletAction:()=>Promise<void>;
  faucet:()=>Promise<void>;
  mintCharacterNFT:(characterIndex:BigNumber)=>Promise<void>;
  attackBoss:(attackIndex:BigNumber)=>Promise<void>;
  attackBossWithSpecialAttack:(attackIndex:BigNumber)=>Promise<void>;
  claimHealth:()=>Promise<void>;
  fetchSpecialAttacks:()=>Promise<SpecialAttackProps[]>;
  buySpecialAttack:(price:BigNumber, index:BigNumber)=>Promise<void>;
}

export interface CharacterProps{
  characterIndex:BigNumber;
  name:string;
  imageURI:string;
  hp:BigNumber;
  maxHp:BigNumber;
  attacks: BigNumber[];
  specialAttacks: BigNumber[];
  lastRegenTime: BigNumber;
  tokenId:BigNumber;
}

export interface AttackProps{
  attackIndex:BigNumber;
  attackName:string;
  attackDamage:BigNumber;
  attackImage:string;
}

export interface SpecialAttackProps{
  price:BigNumber;
  specialAttackIndex:BigNumber;
  specialAttackName:string;
  specialAttackDamage:BigNumber;
  specialAttackImage:string;
}

export interface BigBoss{
  name:string;
  imageURI:string;
  hp:BigNumber;
  maxHp:BigNumber;
  attackDamage:BigNumber;
}