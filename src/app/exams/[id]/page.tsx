import { fetchExamById } from "@/lib/data";
import { getSignedPdfUrl } from "@/lib/supabase";
import PdfViewer from "@/components/exams/PdfViewer";
import DownloadButton from "@/components/exams/DownloadButton";
import { Download, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exam = await fetchExamById(id);

  if (!exam) notFound();

  // Generate temporary signed URLs for the viewer and download
  const signedPdfUrl = await getSignedPdfUrl(exam.pdfUrl);
  const signedSolutionUrl = exam.solutionUrl 
    ? await getSignedPdfUrl(exam.solutionUrl) 
    : null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-purple-600 transition-colors uppercase tracking-widest px-4 py-2 hover:bg-white/50 rounded-2xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au portail
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-black text-purple-400/80 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-widest">
            <Download className="w-3 h-3" />
            {exam.downloadCount || 0} TÉLÉCHARGEMENTS
          </span>
          <span className="text-[10px] font-black text-gray-300 tracking-tighter uppercase px-3 py-1 border border-gray-100 rounded-lg">
            BAC MAROC · {exam.region}
          </span>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl shadow-purple-900/5">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 text-[10px] font-black rounded-lg uppercase tracking-tight">
              {exam.year}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-tight">
              {exam.session}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded-lg uppercase tracking-tight">
              {exam.level}
            </span>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">
              {exam.subject}
            </h1>
            <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-lg">
              {exam.stream.join(" / ")}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {signedPdfUrl && (
            <DownloadButton 
              examId={exam.id} 
              url={signedPdfUrl} 
              label="Sujet" 
              variant="primary" 
            />
          )}

          {signedSolutionUrl && (
            <DownloadButton 
              examId={exam.id} 
              url={signedSolutionUrl} 
              label="Correction" 
              variant="secondary" 
            />
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-premium opacity-5 blur-3xl rounded-full -z-10" />
        {signedPdfUrl ? (
          <PdfViewer url={signedPdfUrl} title={`${exam.subject} ${exam.year}`} />
        ) : (
          <div className="bg-white/60 backdrop-blur-xl rounded-[40px] p-12 md:p-20 flex flex-col items-center justify-center text-center border border-white/80 shadow-inner">
            <div className="w-20 h-20 bg-red-50 text-red-400 rounded-[32px] flex items-center justify-center mb-8 shadow-sm">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Document non trouvé</h3>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              Le fichier <code className="bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-bold">{exam.pdfUrl}</code> est introuvable dans votre bucket Supabase.
            </p>
            <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-3xl text-left max-w-md">
              <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Aide au dépannage
              </h4>
              <ul className="text-xs text-amber-600 space-y-2 font-medium">
                <li>• Vérifiez que le fichier est bien dans le bucket <span className="font-bold underline">exams</span>.</li>
                <li>• Assurez-vous que le nom du fichier correspond <span className="font-bold underline">exactement</span> (majuscules/minuscules).</li>
                <li>• Vérifiez que le bucket est en mode <span className="font-bold underline">Private</span> ou a la bonne policy.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
