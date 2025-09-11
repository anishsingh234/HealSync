export const metadata = {
  title: "Find Doctors - Healsync",
  description: "Book appointments with trusted doctors and manage your healthcare seamlessly on Healsync.",
};

export default async function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
