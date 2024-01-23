import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import type { SignInCred } from "@/lib/firebase/auth";
import { GlobalContext } from "@/contexts/GlobalContext";
import { auth } from "@/lib/firebase/firebase";
import { useToast } from "@/components/ui/use-toast";

export function useSignin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useContext(GlobalContext);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (credentials: SignInCred) =>
      signInWithEmailAndPassword(auth, credentials.email, credentials.password),
    onSuccess: async (result) => {
      if (!result.user.emailVerified) {
        signOut(auth).then(() => {
          queryClient.invalidateQueries();
        });
        throw new Error("Email verification failed");
      }
      localStorage.setItem("provider", "password");
      fetch("/auth/callback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await result.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.replace("/admin");
        }
      });

      setUser(result.user);
      queryClient.setQueryData(["user"], result.user);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Signin failed",
        variant: "destructive",
      });
      throw error;
    },
  });

  return { mutation };
}
