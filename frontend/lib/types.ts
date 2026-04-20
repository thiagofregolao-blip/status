export type Track = 'tecnica' | 'ia_tech';
export type Modality = 'presencial' | 'online_ao_vivo' | 'hibrido' | 'gravado';
export type CourseStatus = 'draft' | 'active' | 'full' | 'finished' | 'archived';

export interface Course {
  id: string;
  title: { pt: string; es: string };
  slug: string;
  descriptionShort: { pt: string; es: string };
  imageUrl: string;
  track: Track;
  category: string;
  modality: Modality;
  price: number;
  installments: number;
  installmentValue: number;
  workloadHours: number;
  startDate: string; // ISO
  endDate: string;   // ISO
  location: { pt: string; es: string };
  totalSeats: number;
  seatsTaken: number;
  status: CourseStatus;
  featured: boolean;
  nrsCovered: string[];
  toolsCovered: string[];
  includes: { pt: string[]; es: string[] };
  machinesUsed: string[];
}

export interface Testimonial {
  id: string;
  studentName: string;
  city: string;
  courseTitle: { pt: string; es: string };
  photoUrl: string;
  text: { pt: string; es: string };
  rating: number;
  featured: boolean;
  track: Track;
}
