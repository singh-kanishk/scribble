import {  
  FieldGroup,
  FieldLegend,
  FieldSet,
    
} from "@/components/ui/field"
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
  
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm} from 'react-hook-form'
import {signUpSchema,type SignUpFormParams} from '@my-app/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { submitSignUpForm } from "@/api/queries"


export function SignUpForm(){
    
    const methods= useForm<SignUpFormParams>({
        resolver:zodResolver(signUpSchema),defaultValues:{
            username:"",
            name:"",
            password:"",
            confirmPassword:""
        },
        mode:"onBlur"
    });
    const {isSubmitting}=methods.formState
    async function onSubmit(data: SignUpFormParams) {
    const response = await submitSignUpForm(data)
    if(!response.success){
      alert(`Submission Faied : ${response.error||response.message}`)
    }    
  }

    return (
      <>
    <Form {...methods}>
    <form className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-50 border-2 border-black p-6 w-100" onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldSet>
          <div className="flex justify-center w-full">
            <FieldLegend>Sign Up</FieldLegend>
            </div>
            <FieldGroup>
          <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                {/* 'field' contains: { onChange, onBlur, value, ref } 
                   We spread it here so the Input gets all those props.
                */}
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                {/* 'field' contains: { onChange, onBlur, value, ref } 
                   We spread it here so the Input gets all those props.
                */}
                <Input placeholder="Johndoe123" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* 'field' contains: { onChange, onBlur, value, ref } 
                   We spread it here so the Input gets all those props.
                */}
                <Input placeholder="secretOfJohnDoe123" type="password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         <FormField
          control={methods.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                {/* 'field' contains: { onChange, onBlur, value, ref } 
                   We spread it here so the Input gets all those props.
                */}
                <Input placeholder="Confirm Password" type="password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button name="submit" type="submit" disabled={isSubmitting} >{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Creating account..." : "Sign Up"}</Button>
        </FieldGroup>
        </FieldSet>
        <div className="flex w-full justify-center pt-2 pb-2">
        <Link to ="/login">Go To Log In</Link>
        </div>
    </form>
    </Form>
     
    </>
    )
}
