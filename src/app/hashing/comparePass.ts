import { compareSync } from "bcrypt-ts";
export default function compareit(str: string, enStr: string){
    return compareSync(str,enStr);
}