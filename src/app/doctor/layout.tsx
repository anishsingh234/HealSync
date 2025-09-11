import { Stethoscope } from "lucide-react";
import { PageHeader } from "@/app/_components/page-header";

export const metadata = {
  title: "Doctor Dashboard - HealSync",
  description: "Manage your appointments and availability",
};

export default async function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader icon={<Stethoscope />} title="Doctor Dashboard" />

      {children}
    </div>
  );
}