import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import DialogCloseButton from "@/app/(front)/auth/components/phone-dialog";

const SigninSocial = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button variant="outline">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button variant="outline">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <DialogCloseButton />
    </div>
  );
};

export default SigninSocial;
