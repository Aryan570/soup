import React, { useState } from 'react'
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
const formSchema = z
    .object({
        device_name: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
    });
const Toggle_grp = () => {
    const [options, setoptions] = useState(["Bulb", "Lamp"]);
    function handlechange(e: String) {
        // future work
        console.log(e);
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            device_name: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setoptions([...options,values.device_name]);
        form.reset();
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
                    {/* <SelectItem value="add"><Add_device/></SelectItem> */}
                    {/* <Add_device key={"add"}/> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
                            <Sheet >
                                <SheetTrigger asChild>
                                    <Button className="w-full" variant="outline"> + </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Add new device</SheetTitle>
                                        <SheetDescription>
                                            Add a new device to dashboard. Click save when you&apos;re done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <FormField
                                        control={form.control}
                                        name="device_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="title" className="text-right">
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
                                            <form><Button type="submit" >Save changes</Button></form>
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
