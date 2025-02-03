"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    document.title = "Reset Password-True Feedback";
  }, []);

  const form = useForm({
    defaultValues: {
      value: "",
    },
  });

  const onSubmitIdentifier = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/reset-password-request", {
        identifier: data.value,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        setUserName(response.data.userName);
        form.reset();
        setVerificationCodeSent(true);
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitCode = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        userName,
        code: data.value,
        resetPassword: true,
      });

      if (response.data.success) {
        router.replace(`/reset-password/${userName}`);
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setVerificationCodeSent(false);
      form.reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8  bg-white rounded-lg shadow-md">
        {!verificationCodeSent ? (
          <>
            {" "}
            <Link href={"/sign-in"}>
              <Button className="-mt-6 -ml-5" variant="outline" size="sm">
                <ChevronLeft />
              </Button>
            </Link>
            <div className="text-center mt-2 ">
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl mb-6">
                Forgot your password?
              </h2>
              <p className="mb-4">Please enter your username or Email</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitIdentifier)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Username or Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Please wait
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl mb-6">
                Verify It's You
              </h2>
              <p className="mb-4">
                Enter the verification code sent to your email
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitCode)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input placeholder="code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Please wait
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
