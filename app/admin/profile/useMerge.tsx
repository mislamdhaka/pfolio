import { useMutation } from "@tanstack/react-query";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useToast } from "@/components/ui/use-toast";

export function useMerge() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (provider: GoogleAuthProvider | GithubAuthProvider) =>
      linkWithPopup(auth.currentUser!, provider),
    onSuccess: (result) => {
      toast({
        title: "Account linking successful",
        description: "We've successfully linked with your previous account",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Account linking failed",
        description:
          "There was an error linking your account. Please try again later.",
      });
    },
  });

  return { mutation };
}
