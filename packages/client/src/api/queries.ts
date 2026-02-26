import {type LogInFormParams, type SignUpFormParams } from "@my-app/shared";
import { apiCall } from "./api-call-wrapper";
import { getUrlForApiCall } from "@/utils/api-related-func";


export async function submitSignUpForm(data:SignUpFormParams){
    const response =await apiCall<null>({
    url:getUrlForApiCall('/auth/signup') ,
    method:'POST' ,
    config:{        
         body:JSON.stringify(data)
            }   
        }
)
    if(!response.success){
        console.log(response.message)
        console.error(response?.error)
    }

    return response
}

export async function submitLoginForm(data:LogInFormParams) {
    const response =await apiCall<null>({
    url:getUrlForApiCall('/auth/login') ,
    method:'POST' ,
    config:{        
         body:JSON.stringify(data)
            }   
        }
    
)
    if(!response.success){
        console.log(response.message)
        console.error(response?.error)
    }

    return response
}
