
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";

export function Options(props : {active : string , devices: string[]}) {
    const router = useRouter();
    function handleChange(e : string){
        router.push(`${e}`);
    }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.active} />
      </SelectTrigger>
      <SelectContent className="font-mono">
        <SelectGroup>
          <SelectLabel>Other Devices</SelectLabel>
          {props.devices.map((device)=>{
            return <SelectItem value={device} key={device}>{device}</SelectItem>;
          }).filter((device)=> device.key !=props.active)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
