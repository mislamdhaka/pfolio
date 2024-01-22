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

// if (error.message === "Firebase: Error (auth/email-already-in-use).") {
//   if (!auth.currentUser) {
//     setMsg({
//       status: "error",
//       title: "Email exists!",
//       message:
//         "The email already in use. To merge your current credential with your previous account, sign in with your previous account then click profile->Merge with Email and Password.",
//     });
//   } else {
//     const prevUser = auth.currentUser;
//     const credential = EmailAuthProvider.credential(
//       "test@test.com",
//       data.password
//     );

//     linkWithCredential(prevUser, credential)
//       .then((result) => {
//         if (auth.currentUser) {
//           updateEmail(auth.currentUser, data.email)
//             .then(() => {
//               console.log(auth.currentUser);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// console.log(auth.currentUser);
// auth.currentUser
//   .delete()
//   .then(() => {
//     createUserWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password
//     ).then((createResult) => {
//       updateProfile(createResult.user, { displayName: data.name })
//         .then(() => {
//           console.log("profile updated");
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       sendEmailVerification(createResult.user)
//         .then(() => {
//           console.log("verification email sent");
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       signInWithCredential(auth, credential)
//         .then((signinResult) => {
//           linkWithCredential(prevUser, credential)
//             .then((linkResult) => {
//               console.log(linkResult);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });

// }
// linkWithPopup(
//   result.user,
//   prevUser.providerData[0].providerId === "github.com"
//     ? githubProvider
//     : googleProvider
// )
//   .then((result) => {
//     setMsg({
//       status: "success",
//       title: "Account merging successful!",
//       message:
//         "Your current credential merged with your previous credential. Now you can signin from both account. Before your sign in check your email account and click on the link to verify your email.",
//     });
//   })
//   .catch((error) => console.log(error));
// })
// .catch((error) => {
//   console.log(error);
// });
//   }
// } else {
//   setMsg({
//     status: "error",
//     title: "User creation failed!",
//     message: "There was some error. Failed to create user.",
//   });
// }
