import { BigNumber } from "ethers";
import attackAnimationOne from "../utils/attack-animation-1.json";
import attackAnimationTwo from "../utils/attack-animation-2.json";
import attackAnimationThree from "../utils/attack-animation-3.json";
import {
  AttackProps,
  BigBoss,
  CharacterProps,
  SpecialAttackProps,
} from "./contracts";

export const parseDefaultCharacter= (data:any) :CharacterProps=>{
    var res: CharacterProps = {
        attacks: data.attacks,
        characterIndex: data.characterIndex,
        hp: data.hp,
        imageURI: data.imageURI,
        maxHp: data.maxHp,
        name: data.name,
        specialAttacks: data.specialAttacks,
        lastRegenTime: data.lastRegenTime,
        tokenId: data.tokenId,
      };
      return res;
}

export const parseAttacks = (data: any): AttackProps => {
    var res: AttackProps = {
      attackDamage: data.attackDamage,
      attackIndex: data.attackIndex,
      attackImage: data.attackImage,
      attackName: data.attackName,
    };
    return res;
  };
  
  export const parseSpecialAttacks = (data: any): SpecialAttackProps => {
    var res: SpecialAttackProps = {
      price: data.price,
      specialAttackDamage: data.specialAttackDamage,
      specialAttackIndex: data.specialAttackIndex,
      specialAttackImage: data.specialAttackImage,
      specialAttackName: data.specialAttackName,
    };
    return res;
  };
  
  export const parseBigBoss = (data: any): BigBoss => {
    var res: BigBoss = {
      attackDamage: data.attackDamage,
      imageURI: data.imageURI,
      hp: data.hp,
      maxHp: data.maxHp,
      name: data.name,
    };
    return res;
  };
  
  export const getAttackAnimation = (attackIndex: BigNumber) => {
    if (attackIndex.toNumber() == 0) {
      return attackAnimationOne;
    } else if (attackIndex.toNumber() == 1) {
      return attackAnimationTwo;
    } else if (attackIndex.toNumber() == 2) {
      return attackAnimationThree;
    } else if (attackIndex.toNumber() == 3) {
      return attackAnimationOne;
    } else if (attackIndex.toNumber() == 4) {
      return attackAnimationTwo;
    } else if (attackIndex.toNumber() == 5) {
      return attackAnimationThree;
    } else if (attackIndex.toNumber() == 6) {
      return attackAnimationOne;
    } else if (attackIndex.toNumber() == 7) {
      return attackAnimationTwo;
    } else if (attackIndex.toNumber() == 8) {
      return attackAnimationThree;
    }
  };