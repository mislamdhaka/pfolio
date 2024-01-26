import { googleProvider } from "@/lib/firebase/firebase";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useProvider } from "./useProvider";

const SigninGoogle = () => {
  const { mutation } = useProvider();
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        mutation.mutate(googleProvider);
        localStorage.setItem("provider", "google.com");
      }}
      disabled={mutation.isPending}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Google
      {mutation.isPending && (
        <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
      )}
    </Button>
  );
};

export default SigninGoogle;
