export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-8 md:px-20 lg:px-32 pt-[80px] pb-16">
      <div className="w-full">
        {children}

      </div>
    </section>
  );
}
