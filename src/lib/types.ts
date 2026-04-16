export type Subject =
  | "Mathématiques"
  | "Physique-Chimie"
  | "SVT"
  | "Français"
  | "Philosophie"
  | "Histoire-Géographie"
  | "Anglais"
  | "Arabe";

export type Stream =
  | "Sciences Mathématiques"
  | "Sciences Physiques"
  | "Sciences de la Vie"
  | "Sciences Économiques"
  | "Lettres"
  | "Sciences Technologiques";

export type Session = "Normal" | "Rattrapage";
export type BacLevel = "1ère Bac" | "2ème Bac";

export interface Exam {
  id: string;
  subject: Subject;
  stream: Stream[];
  year: number;
  session: Session;
  level: BacLevel;
  region: "National" | "Régional";
  pdfUrl: string;
  imageUrl?: string;
  solutionUrl?: string;
  downloadCount?: number;
}
