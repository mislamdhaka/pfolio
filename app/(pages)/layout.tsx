import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const LayoutFront = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default LayoutFront;
