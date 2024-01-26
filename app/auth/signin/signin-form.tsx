"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SigninSocial from "../components/signin-social";
import { useSignin } from "./useSignin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/firebase/firebase";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({ message: "must be a valid email" }),
  password: z.string().min(1, { message: "password is required" }),
});

export default function SigninForm() {
  const { mutation } = useSignin();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "sendmailtomislam@gmail.com",
      password: "Pushpita@2008",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data);
    form.reset();
  }

  function sendVerificationEmail() {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        toast({
          title: "Success",
          description:
            "A verification email sent to your email account. Please click on the link to verify your account.",
        });
      });
    }
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <SigninSocial />
      </CardHeader>
      <CardContent>
        <div className="relative mt-2 mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {mutation.error?.message === "Email verification failed" && (
          <Alert variant="destructive" className="my-6">
            <AlertTitle>Email verification failed!</AlertTitle>
            <AlertDescription>
              Email is not verified. Please verify your email first to sigin in
              to your account.
              <Button
                variant="link"
                className="block p-0"
                onClick={sendVerificationEmail}
              >
                Send verification email again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" type="password" />
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
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-sm text-gray-500">
          <Link href="/auth/reset-password" className="font-semibold leading-6">
            Forgot password?&nbsp;&nbsp;
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
