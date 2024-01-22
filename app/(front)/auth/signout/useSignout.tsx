import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase/firebase";

export function useSignout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: () => signOut(auth),
    onSuccess: async () => {
      const res = await fetch("/auth/signout", { method: "POST" });
      if (res.status === 200) {
        queryClient.removeQueries();
        router.replace("/auth/signin");
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return { mutation };
}
