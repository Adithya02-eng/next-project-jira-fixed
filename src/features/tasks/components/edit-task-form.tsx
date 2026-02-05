"use client"
import {z} from "zod"
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import Image from "next/image"; 
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { createTaskSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";
import { DatePicker } from "@/components/date-picker";
import { SelectContent,Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Task, TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useUpdateTask } from "../api/use-update-task ";
interface EditTaskFormProps{
    onCancel?:()=> void;
    projectOptions:{id:string,name :string, imageUrl:string}[];
    memberOptions:{id:string,name:string}[];
    intialValues:Task
};


export const EditTaskForm = ({onCancel,projectOptions,memberOptions,intialValues}:EditTaskFormProps,)=>{
    const {mutate,isPending} = useUpdateTask()
    const inputRef = useRef<HTMLInputElement>(null)
    const workspaceId = useWorkspaceId();
    const editSchema = createTaskSchema.omit({workspaceId:true,description:true});
    type EditFormInput = z.input<typeof editSchema>;
    type EditFormOutput = z.output<typeof editSchema>;
    const form = useForm<EditFormInput, any, EditFormOutput>({
        resolver: zodResolver(editSchema),
        defaultValues:{
            ...intialValues,
            dueDate:intialValues.dueDate? new Date(intialValues.dueDate):undefined
        },
    });
    const router = useRouter();

    const onSubmit = (values: z.infer<typeof createTaskSchema>)=>{
        
        mutate({json:values,param:{taskId:intialValues.$id}},{
            onSuccess:()=>{
                form.reset();
                onCancel?.();
            }
        })
    };

    return (
        <Card className="w-full h-full border-one shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                     Edit Task
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Task Name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder="Enter Task name" 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    /> 
                            
                            
                            <FormField
                        control={form.control}
                        name="dueDate"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Due Date
                                </FormLabel>
                                <FormControl>
                                    <DatePicker
                                        value={field.value as Date | undefined}
                                        onChange={(d: Date) => field.onChange(d)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    /> 

                    <FormField
                        control={form.control}
                        name="assigneeId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Assignee
                                </FormLabel>
                                    <Select 
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Assignee"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage/>
                                        <SelectContent>
                                            {memberOptions.map((member)=>(
                                                <SelectItem key={member.id} value={member.id}>
                                                    <div className="flex items-center gap-x-2">
                                                        <MemberAvatar
                                                        className="size-6"
                                                        name={member.name}/>
                                                        {member.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    /> 

                    <FormField
                        control={form.control}
                        name="status"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Select Status
                                </FormLabel>
                                    <Select 
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage/>
                                        <SelectContent>
                                            <SelectItem value={TaskStatus.IN_PROGRESS}>
                                                In Porgress
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.IN_REVIEW}>
                                                In Review
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.DONE}>
                                                Done
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.BACKLOG}>
                                                Backlog
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.TODO}>
                                                TODO
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    /> 

                    <FormField
                        control={form.control}
                        name="projectId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Project
                                </FormLabel>
                                    <Select 
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Project"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage/>
                                        <SelectContent>
                                            {projectOptions.map((project)=>(
                                                <SelectItem key={project.id} value={project.id}>
                                                    <div className="flex items-center gap-x-2">
                                                        <ProjectAvatar
                                                        className="size-6"
                                                        name={project.name}
                                                        image={project.imageUrl}/>
                                                        {project.name}
                                                        
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    /> 
                   
                        </div>
                        <DottedSeparator className="py-7"/>
                        <div className="flex items-center justify-between">
                            <Button
                            type="button"
                            size={"lg"}
                            variant={"secondary"}
                            onClick={onCancel}
                            disabled={isPending}
                            className={cn(!onCancel && "invisible")}>
                                Cancel
                            </Button>
                            <Button
                            type="submit"
                            size={"lg"}
                            disabled={isPending}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
