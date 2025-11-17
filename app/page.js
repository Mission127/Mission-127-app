"use client"; 

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ←←← YOUR REAL KEYS ARE HERE ←←←
const supabase = createClient(
  "https://mcsxicomjynmpsyhkesn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jc3hpY29tanlubXBzeWhrZXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDc5MjksImV4cCI6MjA3ODk4MzkyOX0.OI3eVjCrJdGkkCT27qDziqdvjYqvU22TzNdANprvGaM"
);

export default function Home() {
  const [needs, setNeeds] = useState([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  // Load needs + real-time listener
  useEffect(() => {
    fetchNeeds();

    const channel = supabase
      .channel("needs")
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
    await supabase.from("needs").insert({
      title,
      story: story || "No additional details provided.",
      status: "open",
    });
    setTitle("");
    setStory("");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Post a Need */}
      <div className="bg-slate-800 rounded-lg p-6 mb-10 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Share a Need</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g. Single mom needs groceries)"
          className="w-full p-4 rounded bg-slate-700 text-white text-lg mb-3"
        />
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Optional: More details or prayer request..."
          rows={3}
          className="w-full p-4 rounded bg-slate-700 text-white"
        />
        <button
          onClick={addNeed}
          className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-700 rounded font-bold text-lg"
        >
          Post Need
        </button>
      </div>

      {/* Needs Feed */}
      <div className="space-y-6">
        {needs.length === 0 && (
          <p className="text-center text-slate-400 text-xl py-20">
            No needs yet — be the first to share one!
          </p>
        )}
        {needs.map((need) => (
          <div key={need.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white">{need.title}</h3>
            {need.story && <p className="mt-3 text-slate-300">{need.story}</p>}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-slate-500">
                {new Date(need.created_at).toLocaleString()}
              </span>
              <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded font-medium">
                We Can Help
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
          }
