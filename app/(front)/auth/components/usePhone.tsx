import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { GlobalContext } from "@/contexts/GlobalContext";
import type { OTPCred } from "@/lib/firebase/auth";
import { useToast } from "@/components/ui/use-toast";

export function usePhone() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useContext(GlobalContext);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (cred: OTPCred) =>
      await window.confirmationResult.confirm(cred.code),
    onSuccess: async (result) => {
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
        description: "Something went wrong. OTP not varified.",
        variant: "destructive",
      });
    },
  });

  return { mutation };
}
