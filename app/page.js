"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://YOUR-PROJECT.supabase.co",
  "your-anon-key"
);

export default function Home() {
  const [needs, setNeeds] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchNeeds();
    const channel = supabase.channel("needs").on("postgres_changes", { event: "*", schema: "public", table: "needs" }, () => fetchNeeds()).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchNeeds() {
    const { data } = await supabase.from("needs").select("*").order("created_at", { ascending: false });
    setNeeds(data || []);
  }

  async function addNeed() {
    if (!title) return;
    await supabase.from("needs").insert({ title, status: "open" });
    setTitle("");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Post a New Need</h2>
        <div className="flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Single mom needs groceries this week..."
            className="flex-1 p-3 rounded bg-slate-700 text-white"
            onKeyPress={(e) => e.key === "Enter" && addNeed()}
          />
          <button onClick={addNeed} className="px-6 py-3 bg-red-600 rounded hover:bg-red-700 font-medium">
            Share Need
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {needs.map((need) => (
          <div key={need.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold">{need.title}</h3>
            <p className="text-sm text-slate-400 mt-2">Posted {new Date(need.created_at).toLocaleDateString()}</p>
            <button className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-sm">
              We Can Help
            </button>
          </div>
        ))}
        {needs.length === 0 && <p className="text-center text-slate-500 py-12">No needs yet — be the first to post one!</p>}
      </div>
    </div>
  );
}
