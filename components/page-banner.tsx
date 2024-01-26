const PageBanner = ({ title }: { title: string }) => {
  return (
    <div className="bg-secondary py-12 px-4 text-center">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {title}
      </h2>
    </div>
  );
};

export default PageBanner;
