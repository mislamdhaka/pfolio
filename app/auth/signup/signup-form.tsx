"use client";

import * as z from "zod";
import { useState, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  ReloadIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  linkWithPopup,
  EmailAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SigninSocial from "../components/signin-social";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth, githubProvider, googleProvider } from "@/lib/firebase/firebase";
import { useToast } from "@/components/ui/use-toast";
import { GlobalContext } from "@/contexts/GlobalContext";

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "at least 3 charecter long." }),
    email: z
      .string()
      .min(1, {
        message: "email is required",
      })
      .email({ message: "must be a valid email" }),
    password: z
      .string()
      .min(6, { message: "at least 6 charecter long" })
      .regex(new RegExp("^(?=.*[0-9])(?=.*[!@#$&*])(?=.*[A-Z])"), {
        message: "at least 1 number, 1 special charecter and 1 capital letter",
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match.",
    path: ["passwordConfirmation"],
  });

export default function SignupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "M Islam",
      email: "sendmailtomislam@gmail.com",
      password: "Pushpita@2008",
      passwordConfirmation: "Pushpita@2008",
    },
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { msg, setMsg } = useContext(GlobalContext);
  const searchParams = useSearchParams();
  const merge = searchParams.get("merge");
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    const credential = EmailAuthProvider.credential(data.email, data.password);

    if (!merge) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, { displayName: data.name });
          await sendEmailVerification(userCredential.user);
          setMsg({
            status: "success",
            title: "User created!",
            message:
              "Check your email for a verification link. Click the link to verify your account.",
          });
          setLoading(false);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setMsg({
              status: "error",
              title: "Signup failed",
              message: "Email already in use.",
            });
          } else {
            setMsg({
              status: "error",
              title: "Signup failed",
              message:
                "There was some error to create your account. Please try again later.",
            });
          }
          setLoading(false);
        });
    } else {
      auth.currentUser!.delete();
      const provider =
        localStorage.getItem("provider") === "github.com"
          ? githubProvider
          : googleProvider;

      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((result) => {
          signInWithCredential(auth, credential)
            .then(async (result) => {
              await updateProfile(result.user, { displayName: data.name });
              await sendEmailVerification(result.user);
              linkWithPopup(result.user, provider)
                .then((result) => {
                  router.replace("/admin/profile");
                  toast({
                    title: "Account merged!",
                    description:
                      "Email and password linked successfully. We've sent you an email. Please verify your account before sign in.",
                  });
                  setLoading(false);
                })
                .catch((error) => {
                  setMsg({
                    status: "error",
                    title: "Account merging failed!",
                    message:
                      "There was an error merging your account. Please try again later.",
                  });
                  setLoading(false);
                });
            })
            .catch((error) => {
              setMsg({
                status: "error",
                title: "Account merging failed!",
                message:
                  "There was an error merging your account. Please try again later.",
              });
            });
          setLoading(false);
        })
        .catch((error) => {
          setMsg({
            status: "error",
            title: "Account merging failed!",
            message:
              "There was an error merging your account. Please try again later.",
          });
          setLoading(false);
        });
    }
  }

  return (
    <>
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

          {msg.message && (
            <Alert
              className={`my-6 ${
                msg.status === "success" &&
                " text-green-600 border border-green-600"
              }`}
              variant={msg.status === "error" ? "destructive" : "default"}
            >
              {msg.status === "success" ? (
                <CheckCircledIcon className="h-4 w-4" />
              ) : (
                <ExclamationTriangleIcon className="h-4 w-4" />
              )}
              <AlertTitle>{msg.title}</AlertTitle>
              <AlertDescription>
                {msg.message}
                {msg.status === "success" && (
                  <Button
                    variant="link"
                    className="block p-0 mt-2"
                    onClick={() => {
                      setLoading(true);
                      auth.currentUser &&
                        sendEmailVerification(auth.currentUser)
                          .then(() => {
                            toast({
                              title: "verification link sent",
                              description:
                                "Verification link sent again. Please check your inbox.",
                            });
                            setLoading(false);
                          })
                          .catch((error) => {
                            toast({
                              title: "Error sending verification link",
                              description:
                                "There was an error sending verification link again.",
                            });
                            setLoading(false);
                          });
                    }}
                  >
                    <span className="flex items-center">
                      Send verification link again{" "}
                      {loading && (
                        <ReloadIcon className="ml-2 h-3 w-3 animate-spin" />
                      )}
                    </span>
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password confirmation</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
