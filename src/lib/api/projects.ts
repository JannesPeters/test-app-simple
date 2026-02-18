import { supabase } from "@/lib/supabaseClient";

export type Project = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

const projectFields = "id,name,description,created_at";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(projectFields)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createProject(name: string): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert({ name })
    .select(projectFields)
    .single();

  if (error || !data) {
    throw error ?? new Error("Failed to create project.");
  }

  return data;
}
