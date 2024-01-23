import { auth, githubProvider } from "@/lib/firebase/firebase";
import { linkWithPopup } from "firebase/auth";
import { User } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface SignInCred {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface OTPCred {
  code: string;
}

export async function authCallback(user: User, router: AppRouterInstance) {
  fetch("/auth/callback", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      router.replace("/admin");
    }
  });
}

export async function mergeAccount(
  error: Error,
  router: AppRouterInstance,
  toast: any,
  provider: string
) {
  if (
    error.message ===
    "Firebase: Error (auth/account-exists-with-different-credential)."
  ) {
    if (auth.currentUser) {
      linkWithPopup(auth.currentUser, githubProvider)
        .then((result) => {
          authCallback(result.user, router);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to merge account.",
            variant: "destructive",
          });
        });
    } else {
      toast({
        title: "Error",
        description: `${provider} signin failed`,
        variant: "destructive",
      });
    }
  }
}
