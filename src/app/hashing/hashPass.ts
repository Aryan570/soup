import { genSaltSync, hashSync } from "bcrypt-ts";
export default function makeHash(str: string){
      const salt = genSaltSync(10);
      const hash = hashSync(str,salt);
      return hash;
}