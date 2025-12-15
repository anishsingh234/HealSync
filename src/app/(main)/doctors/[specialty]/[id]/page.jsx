import { getAvailableTimeSlots, getDoctorById } from "@/actions/appointment";
import DoctorProfile from "./_components/doctor-profile";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage({ params }) {
  const { id } = params;

  try {
    const [doctorData, slotsData] = await Promise.all([
      getDoctorById(id),
      getAvailableTimeSlots(id)
    ]);

    return (
      <DoctorProfile
        doctor={doctorData.doctor}
        availableDays={slotsData.days || []}
      />
    );
  } catch (err) {
    console.error("Error loading doctor profile:", err);
    redirect("/doctors");
  }
}
