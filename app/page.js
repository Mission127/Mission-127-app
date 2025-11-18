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
      .on("postgres_changes", { event: "*", schema: "public", table: "needs" }, fetchNeeds)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchNeeds() {
    const { data } = await supabase.from("needs").select("*").order("created_at", { ascending: false });
    setNeeds(data || []);
  }

  async function addNeed() {
    if (!title.trim()) return;
    await supabase.from("needs").insert({ title, story: story || "No details", status: "open" });
    setTitle(""); setStory("");
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-black to-gray-900 py-32">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Pure Religion<br />in Action
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            “To look after orphans and widows in their distress…” — James 1:27
          </p>
          <div className="mt-12">
            <button className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition">
              Post a Need Now
            </button>
          </div>
        </div>
      </section>

      {/* Submit Card */}
      <section className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
          <h2 className="text-4xl font-bold mb-8 text-center">Share a Need</h2>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Single mom needs groceries…" className="w-full px-6 py-5 rounded-2xl bg-white/20 text-white placeholder-gray-400 text-xl mb-5 border border-white/30 focus:outline-none focus:ring-4 focus:ring-red-500" />
          <textarea value={story} onChange={e=>setStory(e.target.value)} placeholder="Details, location, prayer requests…" rows={4} className="w-full px-6 py-5 rounded-2xl bg-white/20 text-white placeholder-gray-400 resize-none border border-white/30 focus:outline-none focus:ring-4 focus:ring-red-500" />
          <button onClick={addNeed} className="mt-8 w-full py-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-2xl text-2xl font-bold shadow-xl transform hover:scale-105 transition">
            Send to Churches
          </button>
        </div>
      </section>

      {/* Needs Feed */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-center mb-16">Current Needs</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {needs.length === 0 ? (
            <p className="col-span-2 text-center text-3xl text-gray-500 py-20">No active needs right now — praise God!</p>
          ) : (
            needs.map(n => (
              <div key={n.id} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-red-500/50 transition hover:transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4">{n.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{n.story}</p>
                <div className="mt-8 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{new Date(n.created_at).toLocaleDateString()}</span>
                  <button className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105">
                    We Can Help
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
