import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import type { Message } from "@/lib/types";

const ShowAlert = ({ msg }: { msg: Message }) => {
  return (
    <>
      {msg.message && (
        <Alert variant={msg.status === "success" ? "success" : "destructive"}>
          {msg.status === "success" ? (
            <CheckCircledIcon className="h-4 w-4" />
          ) : (
            <ExclamationTriangleIcon className="h-4 w-4" />
          )}
          <AlertTitle>{msg.title}</AlertTitle>
          <AlertDescription>{msg.message}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ShowAlert;
