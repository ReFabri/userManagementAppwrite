"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const session = await appwriteService.login(formData);
      if (session) {
        setAuthStatus(true);
        router.push("/profile");
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      setError(message);
    }
  };

  return <div></div>;
};

export default Login;
