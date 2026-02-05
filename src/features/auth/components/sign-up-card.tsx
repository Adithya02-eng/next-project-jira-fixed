"use client"
import {zodResolver} from "@hookform/resolvers/zod" 
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa6" 
import { useForm } from "react-hook-form"
import z from "zod"
import Link from "next/link"
import { registerSchema } from "../schema"
import { useRegister } from "../api/use-register"
const formSchema = z.object({
        email: z.string().email(),
        name: z.string().trim().min(1,"Required"),
        password: z.string().min(1,"Required"),
    });
export const SignUpcard = ()=>{
    const {mutate,isPending} = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            name:"",
            email:"",
            password:""
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>)=>{
        mutate({json:values})
    }
    
    return(
        <Card className="size-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
            <CardTitle className="text-2xl">Sign-Up</CardTitle>
            <div className="px-7">
                <DottedSeparator/>
            </div>
        </CardHeader>
        <CardContent className="p-7">
            <Form {...form}>
                <form  onSubmit = {form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    disabled={isPending}
                    name="name"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                type="string"
                                placeholder="Enter Name"
                                {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    disabled={isPending}
                    name="email"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                type="email"
                                placeholder="Enter Email Address"
                                {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    disabled={isPending}
                    name="password"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                type="password"
                                placeholder="Enter Password"
                                {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button disabled={isPending} size={"lg"} className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardContent>
        <div className="px-7">
            <DottedSeparator/>
        </div>
        {/* <CardContent className="p-7 flex flex-col ">
            <Button
            disabled={isPending}
            variant={"secondary"}
            size={"lg"}
            className="w-full">
                <FcGoogle className="mr-2" size={"5"}/>
                SignUp with Google
            </Button>
        </CardContent>
        <div className="px-7">
            <DottedSeparator/>
        </div> */}
        <CardContent className="p-7 flex flex-col">
            <Button
            variant={"secondary"}
            size={"lg"}
            className="w-full"
            disabled={isPending}>
                <FaGithub className="mr-2" size={"5"}/>
                SignUp with Github
            </Button>
        </CardContent>
        <CardContent className="p-7 flex items-center justify-center">
            <Link href="/sign-in">
            <span className="text-blue-700">
                Already Have Account?
            </span>
            </Link>
        </CardContent>
    </Card>
    )
}