import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import DialogCloseButton from "@/app/(front)/auth/components/phone-dialog";

const SigninSocial = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Button variant="outline" className="w-full">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button variant="outline" className="w-full">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <DialogCloseButton />
    </div>
  );
};

export default SigninSocial;
