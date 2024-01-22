"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { ReloadIcon } from "@radix-ui/react-icons";

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
import { auth } from "@/lib/firebase/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({ message: "must be a valid email" }),
});

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    description: "",
    status: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setMessage({
          title: "Email sent!",
          description: "Password reset link sent to your email.",
          status: "success",
        });
        form.reset();
        setLoading(false);
      })
      .catch((error) => {
        setMessage({
          title: "Message sending failed!",
          description:
            "There was an error! Failed to send password reset link.",
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Send password reset link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
