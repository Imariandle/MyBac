import { Exam } from "@/lib/types";
import ExamCard from "./ExamCard";

interface ExamGridProps {
  exams: Exam[];
}

export default function ExamGrid({ exams }: ExamGridProps) {
  if (exams.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Aucun examen trouvé</p>
        <p className="text-sm mt-1">Essayez d&apos;autres filtres</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
}
