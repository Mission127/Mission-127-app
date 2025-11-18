"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mcsxicomjynmpsyhkesn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jc3hpY29tanlubXBzeWhrZXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDc5MjksImV4cCI6MjA3ODk4MzkyOX0.OI3eVjCrJdGkkCT27qDziqdvjYqvU22TzNdANprvGaM"
);

export default function Home() {
  const [needs, setNeeds] = useState([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    fetchNeeds();
    const channel = supabase.channel("needs")
      .on("postgres_changes", { event: "*", schema: "public", table: "needs" }, () => fetchNeeds())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchNeeds() {
    const { data } = await supabase.from("needs").select("*").order("created_at", { ascending: false });
    setNeeds(data || []);
  }

  async function addNeed() {
    if (!title.trim()) return;
    await supabase.from("needs").insert({ title, story: story || null, status: "open" });
    setTitle("");
    setStory("");
  }

  return (
    <div>
      <div className="bg-slate-800 rounded-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-red-500 mb-6">Share a Need</h2>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Single mom needs groceries..." className="w-full p-4 rounded bg-slate-700 text-xl mb-4" />
        <textarea value={story} onChange={e => setStory(e.target.value)} placeholder="More details (optional)" rows={3} className="w-full p-4 rounded bg-slate-700" />
        <button onClick={addNeed} className="mt-6 px-10 py-4 bg-red-600 hover:bg-red-700 rounded-lg text-xl font-bold">
          Post Need
        </button>
      </div>

      <div className="space-y-6">
        {needs.length === 0 ? (
          <p className="text-center text-2xl text-slate-500 py-20">No needs yet — be the first!</p>
        ) : (
          needs.map(need => (
            <div key={need.id} className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <h3 className="text-2xl font-bold">{need.title}</h3>
              {need.story && <p className="mt-4 text-lg text-slate-300">{need.story}</p>}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-slate-500">{new Date(need.created_at).toLocaleString()}</span>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold">
                  We Can Help
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  }
