"use client"

import axios from "axios"

import {FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";


const LoginModal  = () =>{
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] =  useState(false);
    const router = useRouter();

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          email: '',
          password: ''
        },
      });
    
        const onSubmit: SubmitHandler<FieldValues> = (data) =>{
            setIsLoading(true);

            signIn("credentials", {
                ...data,
                redirect: false,
            })
            .then((callback) =>{
                setIsLoading(false);
                if(callback?.ok){
                    toast.success("Logged in");
                    router.refresh();
                    loginModal.onClose();
               }

               if(callback?.error){
                toast.error(callback.error);
               }
            })
     }

     const bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
        title="Welcome to back"
        subtitle="Login to your account!"
        center/>

        <Input
        id="email"
        lable="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>
        
       
<Input
        id="password"
        type="password"
        lable="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>
          </div>
 );

 const footerContent =(
  <div className="flex flex-col gap-4 mt-3">
    <hr/>
    <Button
    outline
    label="Continue with Google"
    icon={FcGoogle}
    onClick={(() => {})}/>

     <Button
    outline
    label="Continue with Github"
    icon={AiFillGithub}
    onClick={(() => {})}/>


  </div>
 )

    return (
       <Modal
       disabled={isLoading}
       isOpen={loginModal.isOpen}
       title="Login"
       actionLabel="Continue"
       onClose={loginModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
       />
      );

}
 


export default LoginModal; 