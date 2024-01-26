import { useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { applyActionCode } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VerifyEmail = ({
  actionCode,
  continueUrl,
  lang,
}: {
  actionCode: string | null;
  continueUrl: string | null;
  lang: string | null;
}) => {
  const [response, setResponse] = useState({ title: "", message: "" });
  const router = useRouter();

  const handleVerifyClick = () => {
    applyActionCode(auth, actionCode || "test")
      .then((res) => {
        setResponse({
          title: "Verification successful!",
          message:
            "Successfully verified your email account. Now you can signin to your account.",
        });
      })
      .catch((error) => {
        setResponse({
          title: "Verification failed!",
          message:
            "Cannot verify your accont. Either link was used or expired.",
        });
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {response.title && response.message && (
        <Card className="max-w-lg mt-6">
          <CardHeader>
            <CardTitle>{response.title}</CardTitle>{" "}
          </CardHeader>
          <CardContent>
            <CardDescription>{response.message}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="ghost" onClick={() => router.push("/auth/signin")}>
              Go back to signin
            </Button>
          </CardFooter>
        </Card>
      )}

      <Button onClick={handleVerifyClick} className="mt-8">
        Click here to verify your account
      </Button>
    </div>
  );
};

export default VerifyEmail;
