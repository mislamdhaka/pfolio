import { githubProvider } from "@/lib/firebase/firebase";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useProvider } from "./useProvider";

const SigninGithub = () => {
  const { mutation } = useProvider();
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        mutation.mutate(githubProvider);
        localStorage.setItem("provider", "github.com");
      }}
      disabled={mutation.isPending}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Github
      {mutation.isPending && (
        <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
      )}
    </Button>
  );
};

export default SigninGithub;
