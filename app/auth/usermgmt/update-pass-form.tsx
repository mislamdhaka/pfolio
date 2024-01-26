"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/firebase/firebase";

const FormSchema = z
  .object({
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

export default function UpdatePasswordForm({
  actionCode,
  continueUrl,
  lang,
}: {
  actionCode: string | null;
  continueUrl: string | null;
  lang: string | null;
}) {
  const [message, setMessage] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    verifyPasswordResetCode(auth, actionCode || "test")
      .then((email) => {
        confirmPasswordReset(auth, actionCode || "test", data.password)
          .then((resp) => {
            setMessage({
              title: "Password reset successful",
              description: "Now signin with the updated password.",
              status: "success",
            });
            form.reset();
            setLoading(false);
          })
          .catch((error) => {
            setMessage({
              title: "Error reseting password",
              description:
                "The code might have expired or the password is too weak.",
              status: "error",
            });
            setLoading(false);
          });
      })
      .catch((error) => {
        setMessage({
          title: "Error reseting password",
          description:
            "Invalid or expired action code. Please try to reset password again.",
          status: "error",
        });
        setLoading(false);
      });
  }

  return (
    <Card className="p-4">
      <CardContent>
        {message.title && message.description && (
          <Alert
            variant={message.status === "error" ? "destructive" : null}
            className="my-6"
          >
            <AlertTitle>{message.title}</AlertTitle>
            <AlertDescription>{message.description}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
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
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Update password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
