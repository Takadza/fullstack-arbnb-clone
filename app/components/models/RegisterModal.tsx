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
import { signIn } from "next-auth/react";

const RegisterModal  = () =>{
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] =  useState(false);

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

            axios.post('/api/register', data)
            .then(() =>{
                registerModal.onClose();
            })
            .catch((error) =>{
                toast.error("something went wrong")
            })
            .finally(() => {
                setIsLoading(false);
            })
     }

     const bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
        title="Welcome to Airbnb"
        subtitle="Create an Account!"
        center/>

        <Input
        id="email"
        lable="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>
        
        <Input
        id="name"
        lable="Name"
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
    onClick={()=> signIn("github")}/>

  </div>
 )

    return (
       <Modal
       disabled={isLoading}
       isOpen={registerModal.isOpen}
       title="Register"
       actionLabel="Continue"
       onClose={registerModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
       />
      );

}
 


export default RegisterModal;