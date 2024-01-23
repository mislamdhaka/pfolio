"use client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { auth, githubProvider, googleProvider } from "@/lib/firebase/firebase";
import { unlink } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { GlobalContext } from "@/contexts/GlobalContext";

import { useMerge } from "./useMerge";

const Profile = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutation } = useMerge();
  const { setMsg } = useContext(GlobalContext);
  const providers: string[] = [];

  if (!auth.currentUser)
    return (
      <div className="flex justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  for (const element of auth.currentUser.providerData) {
    providers.push(element.providerId);
  }

  const handleUnlink = (provider: string) => {
    unlink(auth.currentUser!, provider)
      .then(() => {
        toast({
          title: "Account unlink successful",
          description: `${provider} unlinked from your account.`,
        });
      })
      .catch((error) => {
        toast({
          title: "Account unlink failed",
          description: `${provider} unlink failed.`,
        });
      });
  };

  if (providers.includes("phone")) return;

  return (
    <div className="flex flex-col items-start space-y-2">
      {providers.includes("phone") ? (
        ""
      ) : providers.includes("google.com") ? (
        <Button onClick={() => handleUnlink("google.com")} className=" w-64">
          <Icons.google className="mr-2 h-4 w-4" />
          Unlink Google
        </Button>
      ) : (
        <Button
          onClick={() => mutation.mutate(googleProvider)}
          className=" w-64"
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Merge with Google
        </Button>
      )}
      {providers.includes("github.com") ? (
        <Button onClick={() => handleUnlink("github.com")} className=" w-64">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Unlink Github
        </Button>
      ) : (
        <Button
          onClick={() => mutation.mutate(githubProvider)}
          className=" w-64"
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Merge with Github
        </Button>
      )}

      {!providers.includes("password") && (
        <Button
          onClick={() => {
            setMsg({ status: "", title: "", message: "" });
            router.push("/auth/signup?merge=true");
          }}
          className=" w-64"
        >
          <Icons.evelope className="mr-2 h-4 w-4" />
          Merge with Email
        </Button>
      )}
    </div>
  );
};

export default Profile;
