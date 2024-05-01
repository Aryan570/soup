"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { toast } from './ui/use-toast'
import { useSession } from 'next-auth/react'
const formSchema = z
    .object({
        device_name: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
    });
const Toggle_grp = ({s_curr_active , devices} : {s_curr_active: Dispatch<SetStateAction<string>>,devices : string[]}) => {
    const [options, setoptions] = useState(devices);
    const {update} = useSession();
    // console.log(update);
    function handlechange(e: string) {
        // future work
        s_curr_active(e);
        // console.log(e);
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            device_name: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!options.includes(values.device_name)){
            await fetch('/api/new_collec', {
                method: 'POST',
                body: JSON.stringify(values.device_name),
            })
            update({devices : [...options,values.device_name]});
            setoptions([...options, values.device_name]);
            form.reset();
        }else{
            toast({
                title: "Device already exists:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4 bg-red-600 font-mono">
                        <code className="text-white">name: {values.device_name}</code>
                    </pre>
                ),
            })
        }

    }
    return (
        <div className='font-mono font-extrabold text-base'>
            <Select onValueChange={handlechange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue defaultValue="bulb" placeholder="Devices" />
                </SelectTrigger>
                <SelectContent className='font-mono font-extrabold'>
                    {options.map((device) =>
                        <SelectItem key={device} value={device}>{device}</SelectItem>
                    )}
                    {/* <SelectItem value="add"><Add_device/></SelectItem> */}
                    {/* <Add_device key={"add"}/> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="font-mono">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="w-full" variant="outline"> + </Button>
                                </SheetTrigger>
                                <SheetContent className='backdrop-blur-lg'>
                                    <SheetHeader>
                                        <SheetTitle className='font-mono'>Add new device</SheetTitle>
                                        <SheetDescription className='font-mono'>
                                            Add a new device to dashboard. Click save when you&apos;re done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <FormField
                                        control={form.control}
                                        name="device_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid gap-4 py-4 font-mono">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="device_name" className="text-right">
                                                                Device
                                                            </Label>
                                                            <Input placeholder="device" className="col-span-3" {...field} />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className=" text-red-400 font-bold" />
                                            </FormItem>
                                        )}
                                    />
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <form><Button type="submit" className='font-mono' >Save changes</Button></form>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </form>
                    </Form>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Toggle_grp
