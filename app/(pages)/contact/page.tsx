import PageBanner from "@/components/page-banner";
import ContactForm from "./contact-form";
import ContactDetails from "./contact-details";
import GMap from "@/app/(pages)/contact/gmap";

const Contact = () => {
  return (
    <>
      <PageBanner title="Contact" />
      <div className="mx-auto max-w-xl text-center px-4">
        <p className="text-md text-muted-foreground py-10 md:py-16 text-left">
          Email me with questions or inquiries. I&apos;d be happy to answer your
          questions and set up a meeting with you within the shortest possible
          time.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-4 px-4">
        <ContactDetails />
        <ContactForm />
      </div>
      <div className="mx-auto max-w-4xl text-center px-4 mt-8 md:mt-16">
        <GMap />
      </div>
    </>
  );
};

export default Contact;
