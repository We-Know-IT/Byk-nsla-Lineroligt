type AdminSectionPageProps = {
  children?: React.ReactNode;
};

export default function AdminSectionPage({ children }: AdminSectionPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <section className="flex flex-1 flex-col px-4 pb-8 pt-4" aria-label="Admin">
        {children}
      </section>
    </div>
  );
}
