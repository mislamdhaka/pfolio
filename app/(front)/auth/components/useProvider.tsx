import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import { GlobalContext } from "@/contexts/GlobalContext";
import { auth } from "@/lib/firebase/firebase";
import { authCallback } from "@/lib/firebase/auth";
import { Provider } from "@radix-ui/react-toast";

export function useProvider() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setMsg } = useContext(GlobalContext);

  const mutation = useMutation({
    mutationFn: (provider: GithubAuthProvider | GoogleAuthProvider) =>
      signInWithPopup(auth, provider),
    onSuccess: (result) => {
      authCallback(result.user, router);
      queryClient.setQueryData(["user"], result.user);
    },
    onError: (error: any) => {
      if (error.code === "auth/account-exists-with-different-credential") {
        setMsg({
          status: "error",
          title: "Account exists with different credential",
          message:
            "The email address you are trying to use already exists in our system. Signin with your previous account credential and visit profile page on admin panel to merge this account with previous one.",
        });
        router.push("/auth/signup");
      }
      throw error;
    },
  });

  return { mutation };
}
