
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getDoctorById } from "@/actions/appointment";
import { PageHeader } from "@/app/_components/page-header";


interface DoctorProfileLayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const { doctor } = await getDoctorById(id);

  return {
    title: `Dr. ${doctor.name} - HealSync`,
    description: `Book an appointment with Dr. ${doctor.name}, a ${doctor.specialty} specialist with ${doctor.experience} years of experience on HealSync.`,
  };
}

export default async function DoctorProfileLayout({
  children,
  params,
}: DoctorProfileLayoutProps) {
  const { id } = params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) redirect("/doctors");

  return (
    <div className="container mx-auto">
      <PageHeader
        title={"Dr. " + doctor.name}
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Back to ${doctor.specialty}`}
      />
      {children}
    </div>
  );
}
