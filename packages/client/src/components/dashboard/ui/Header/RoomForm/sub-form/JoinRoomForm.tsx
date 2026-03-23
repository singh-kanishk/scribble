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
 import { Input } from "@/components/ui/input"
 import { Button } from "@/components/ui/button"
 import { useForm} from 'react-hook-form'
import { DrawerClose } from "@/components/ui/drawer"

interface JoinRoom{
    roomId:number,
    passcode:string
}

export function JoinRoomForm(){

    const methods = useForm<JoinRoom>();

    function onSubmit(){}
    return (
    <Form {...methods}>
    <form className=" bg-amber-50 border-2 border-black p-6 w-100" onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldSet>
          <div className="flex justify-center w-full">
            <FieldLegend>Join Room</FieldLegend>
            </div>
            <FieldGroup>
          
        <FormField
          control={methods.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Id</FormLabel>
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
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passcode</FormLabel>
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
         <div className="flex flex-col gap-1">
        <Button name="submit" type="submit" className="hover:bg-gray-500">Join</Button>
        <DrawerClose asChild>
        <Button name="cancel" type="reset" className="bg-white text-black hover:bg-amber-100">Cancel</Button>
        </DrawerClose>
        </div>
        </FieldGroup>
        </FieldSet>
        <div className="flex w-full justify-center pt-2 pb-2">
        </div>
    </form>
    </Form>
)
}

