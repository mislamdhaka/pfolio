"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useReCaptcha } from "next-recaptcha-v3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { verifyCaptchaAction } from "@/lib/mail/verifyRecaptcha";
import sendMail from "@/lib/mail/sendMail";
import type { Message } from "@/lib/types";
import ShowAlert from "@/components/show-alert";

export const FormSchema = z.object({
  firstName: z.string().min(3, { message: "at least 3 charecter long." }),
  lastName: z.string().min(3, { message: "at least 3 charecter long." }),
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({ message: "must be a valid email" }),
  message: z.string().min(20, { message: "at least 20 charecter long." }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Message>({
    status: "",
    title: "",
    message: "",
  });

  const { executeRecaptcha } = useReCaptcha();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("form_submit");
    const verified = await verifyCaptchaAction(token);
    console.log(verified);

    if (verified) {
      sendMail(data)
        .then((res) => {
          if (res?.messageId) {
            setMsg({
              status: "success",
              title: "Success!",
              message: "Message submitted successfully.",
            });
            form.reset();
            setLoading(false);
          } else {
            setMsg({
              status: "error",
              title: "Error",
              message: "There was an error. Message not sent.",
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setMsg({
            status: "error",
            title: "Error",
            message: "There was an error. Message not sent.",
          });
          setLoading(false);
        });
    } else {
      setMsg({
        status: "error",
        title: "Error",
        message: "Captcha verification failed. Message not sent.",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Text me</CardTitle>
          <ShowAlert msg={msg} />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        type="text"
                        placeholder="First name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        type="text"
                        placeholder="Last name"
                      />
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
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        type="email"
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="w-full"
                        placeholder="Type your message here..."
                        rows={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                <PaperPlaneIcon className="mr-2 h-4 w-4" />
                Send
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
