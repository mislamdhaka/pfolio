import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import PhoneSigninForm from "./phone-signin-form";

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Icons.phone className="mr-2 h-4 w-4" />
          Phone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Phone signin</DialogTitle>
          <DialogDescription>
            Authentication with your cell phone
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <PhoneSigninForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
