import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { env } from "@/config/env";
import { createProject, getProjects, type Project } from "@/lib/api/projects";
import { supabase } from "@/lib/supabaseClient";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);

    try {
      const suffix = new Date().toISOString().slice(11, 19);
      const created = await createProject(`Project ${suffix}`);
      setProjects((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Failed to create project", err);
      setError("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  const handlePing = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Supabase auth check failed", error);
      return;
    }

    console.info("Supabase auth ok", data);
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Agent Boilerplate
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Vite + React + Tailwind + Supabase
          </h1>
          <p className="text-slate-300">
            Mode: {import.meta.env.MODE} | Supabase: {env.supabaseUrl}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-400">
            Try the Supabase client (auth check, no tables required).
          </p>
          <Button className="mt-4" onClick={handlePing}>
            Ping Supabase
          </Button>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-400">Projects table demo.</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadProjects} disabled={loading}>
                Refresh
              </Button>
              <Button onClick={handleCreate} disabled={loading}>
                Add sample
              </Button>
            </div>
          </div>
          {error ? (
            <p className="mt-4 text-sm text-rose-400">{error}</p>
          ) : null}
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {projects.length === 0 && !loading ? (
              <li className="text-slate-500">No projects yet.</li>
            ) : null}
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-800/60 bg-slate-950/40 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-slate-100">{project.name}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(project.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="text-xs text-slate-500">{project.id}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
