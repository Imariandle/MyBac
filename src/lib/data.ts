import { supabase } from "./supabase";
import { Exam, Subject, Session, BacLevel, Stream } from "./types";

const mapExam = (row: any): Exam => ({
  id: row.id,
  subject: row.subject as Subject,
  stream: row.stream as Stream[],
  year: row.year,
  session: row.session as Session,
  level: row.level as BacLevel,
  region: row.region,
  pdfUrl: row.pdf_path,
  imageUrl: row.image_url,
  solutionUrl: row.solution_path,
  downloadCount: row.download_count,
});

export const fetchExams = async (filters: {
  subject?: string;
  year?: string;
  session?: string;
  level?: string;
  query?: string;
}): Promise<Exam[]> => {
  if (!supabase) return [];

  const fetchPromise = (async () => {
    let query = supabase
      .from("exams")
      .select("*")
      .order("year", { ascending: false })
      .range(0, 9999);

    if (filters.subject) query = query.eq("subject", filters.subject);
    if (filters.year) query = query.eq("year", parseInt(filters.year));
    if (filters.session) query = query.eq("session", filters.session);
    if (filters.level) query = query.eq("level", filters.level);
    
    if (filters.query) {
      query = query.or(`subject.ilike.%${filters.query}%,region.ilike.%${filters.query}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(mapExam);
  })();

  const timeoutPromise = new Promise<Exam[]>((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), 15000)
  );

  try {
    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (err) {
    console.error("Database Error:", err);
    return [];
  }
};

export const fetchExamById = async (id: string): Promise<Exam | null> => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapExam(data);
};

export const recordDownload = async (id: string): Promise<void> => {
  if (!supabase) return;

  const { error } = await supabase.rpc("increment_download", {
    record_id: id,
  });

  if (error) console.error("Error recording download:", error);
};

export const getAvailableYears = async (): Promise<number[]> => {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("exams")
    .select("year")
    .order("year", { ascending: false });

  if (error) return [];
  return [...new Set(data.map((d: any) => d.year))].filter(Boolean) as number[];
};

export const getAvailableSubjects = async (): Promise<string[]> => {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("exams")
    .select("subject")
    .order("subject");

  if (error) return [];
  return [...new Set(data.map((d: any) => d.subject))].filter(Boolean) as string[];
};
