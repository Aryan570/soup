import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const Toggle_grp = () => {
    const options = ["Bulb", "Lamp"];
    function handlechange(e: String) {
        console.log(e);
    }
    return (
        <div className='font-mono font-extrabold text-sm'>
            <Select onValueChange={handlechange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue defaultValue="Bulb" placeholder="Devices" />
                </SelectTrigger>
                <SelectContent className='font-mono font-extrabold text-sm'>
                    {options.map((device) =>
                        <SelectItem key={device} value={device}>{device}</SelectItem>
                    )}
                    <SelectItem value="add">+</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Toggle_grp
