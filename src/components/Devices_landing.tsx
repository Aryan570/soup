"use client"
import React, { BaseSyntheticEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const formSchema = z
    .object({
        device_name: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
    });
const Devices_landing = ({ devices }: { devices: string[] }) => {
    const router = useRouter();
    const [opt, setopt] = useState(devices);
    const { update } = useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            device_name: "",
        },
    })
    function handleClick(e: BaseSyntheticEvent) {
        console.log(`/${e.target.id}`);
        router.push(`/${e.target.id}`);
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!opt.includes(values.device_name)) {
            await fetch('/api/new_collec', {
                method: 'POST',
                body: JSON.stringify(values.device_name),
            })
            update({ devices: [...opt, values.device_name] });
            setopt([...opt, values.device_name]);
            form.reset();
        } else {
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
        <div className=''>
            <table className='w-64 rounded-lg bg-rose-100 overflow-hidden text-base'>
                <thead>
                    <tr className=' bg-gray-900'>
                        <th className='text-gray-200 px-2 py-2'>Devices</th>
                    </tr>
                </thead>
                {opt.map((device) => {
                    return <tr className='hover:cursor-pointer' key={device} onClick={handleClick} >
                        <td id={device} className='px-2 py-2 border-b-2'>{device}</td>
                    </tr>;
                })}
            </table>
            {/* <div className='flex items-center justify-around text-xl max-w-full'> */}
                {/* <div>
                    Add New Device
                </div> */}
                <div className='mt-3'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="font-mono">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="w-full " variant="default"> Add New Device </Button>
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
            {/* </div> */}
            </div>
        </div>
    )
}

export default Devices_landing
