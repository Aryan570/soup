"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
// import { toast } from '../components/ui/use-toast'
import {toast} from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {Loader2} from 'lucide-react'
const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        cpassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
    .refine((data) => data.password === data.cpassword, {
        message: "Passwords don't match",
        path: ["cpassword"],
    });
const SignUp = () => {
    const [load, setload] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            cpassword: "",
        },
    })
    const router = useRouter();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setload(true);
        const res = await fetch('/api/userpost', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        const ch = await res.json();
        if (res) {
            toast({
                title: "Welcome to the Dashboard:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4">
                        <code className="">name: {values.username}</code>
                        <p>Your Journey is officially started! Enjoy!!</p>
                    </pre>
                ),
            })
            const uname = values.username
            const upass = ch.pass
            const res2 = await signIn("credentials", {
                uname,
                upass,
                redirect: false
            })
            setload(false);
            form.reset();
            router.push('/');
        }
    }
    return (
        <Form {...form}>
            <div className="flex font-mono justify-center items-center min-h-screen  bg-[url('/check.jpg')] bg-cover">
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-8 rounded-2xl space-y-6 max-w-sm container backdrop-blur-xl border-yellow-400 border">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Username</FormLabel>
                                <FormControl>
                                    <Input className='text-base bg-white' placeholder="enter username" {...field} />
                                </FormControl>
                                <FormDescription className='text-base'>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Set Password</FormLabel>
                                <FormControl>
                                    <Input className='text-base bg-white' placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input className='text-base bg-white' placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={'default'} className=' w-full text-base' disabled={load} >{load ? <Loader2 className='animate-spin'/> : "Submit"}</Button>
                </form>
            </div>
        </Form>
    )
}

export default SignUp