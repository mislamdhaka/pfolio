import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

const ContactDetails = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="h-full p-0">
        <Image
          src="/contact.jpg"
          alt="contact page"
          width={600}
          height={900}
          className="h-full w-full object-cover"
        />
      </CardContent>
    </Card>
  );
};

export default ContactDetails;
