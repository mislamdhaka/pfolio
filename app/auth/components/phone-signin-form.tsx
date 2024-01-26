"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase/firebase";
import { usePhone } from "./usePhone";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const phoneRegex = new RegExp(/^\+[1-9]{1}[0-9]{3,14}$/);

const FormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, {
      message: "phone is required",
    })
    .regex(phoneRegex, "Invalid Number!"),
});

const OTPSchema = z.object({
  code: z.string().min(1, {
    message: "code is required",
  }),
});

export default function PhoneSigninForm() {
  const { mutation } = usePhone();
  const [otpsent, setOptSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const otpform = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, data.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOptSent(true);
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Something went wrong. Message not sent.",
          variant: "destructive",
          className: cn(
            "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4  sm:right-0  sm:flex-col md:max-w-[420px]"
          ),
        });
        setLoading(false);
      });
  }

  function onSubmitOtp(data: z.infer<typeof OTPSchema>) {
    mutation.mutate(data);
  }

  return (
    <>
      <div className={`${otpsent ? "hidden" : "block"} space-y-6`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter phone number</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP
            </Button>
          </form>
        </Form>
      </div>

      <div className={`${otpsent ? "block" : "hidden"} space-y-6`}>
        <Form {...otpform}>
          <Alert>
            <InfoCircledIcon className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              Retrive OTP from your phone and enter below
            </AlertDescription>
          </Alert>
          <form
            onSubmit={otpform.handleSubmit(onSubmitOtp)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={otpform.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Verify OTP
            </Button>
          </form>
        </Form>
      </div>

      <div id="recaptcha-container" className={`hidden`}></div>
    </>
  );
}
