const MAP: Record<string, string> = {
  Cardiology: "/images/doctor-ahmed.jpg",
  Orthopedics: "/images/doctor-fatima.jpg",
  Pediatrics: "/images/doctor-bilal.jpg",
  Dermatology: "/images/doctor-ayesha.jpg",
  Neurology: "/images/doctor-usman.jpg",
};

export function doctorImage(specialty: string): string {
  return MAP[specialty] || "/images/doctor-ahmed.jpg";
}
