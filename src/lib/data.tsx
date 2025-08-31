import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile to get personalized healthcare recommendations and services.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Book Appointments",
    description:
      "Browse doctor profiles, check availability, and book appointments that fit your schedule.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Video Consultation",
    description:
      "Connect with doctors through secure, high-quality video consultations from the comfort of your home.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Consultation Credits",
    description:
      "Purchase credit packages that fit your healthcare needs with our simple subscription model.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Verified Doctors",
    description:
      "All healthcare providers are carefully vetted and verified to ensure quality care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Medical Documentation",
    description:
      "Access and manage your appointment history, doctor's notes, and medical recommendations.",
  },
];

export const testimonials = [
  {
    initials: "AK",
    name: "Anita K.",
    role: "Patient",
    quote:
      "Booking appointments through this app is effortless. I no longer have to wait in long queues at the clinic.",
  },
  {
    initials: "VS",
    name: "Dr. Vikram S.",
    role: "Dermatologist",
    quote:
      "The platform allows me to balance my schedule while still giving quality care. Patients find it very easy to reach me.",
  },
  {
    initials: "RM",
    name: "Rohan M.",
    role: "Patient",
    quote:
      "I love how prescriptions are shared instantly after consultations. It makes managing my treatment simple and stress-free.",
  },
];

export const creditBenefits = [
  "One appointment uses <strong class='text-emerald-400'>1 credit</strong>, no hidden charges",
  "Credits are <strong class='text-emerald-400'>valid forever</strong> until used",
  "Get <strong class='text-emerald-400'>bonus credits</strong> with every annual plan",
  "Easily <strong class='text-emerald-400'>upgrade or downgrade</strong> your plan whenever needed",
];
