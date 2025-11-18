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
    await supabase.from("needs").insert({ title, story: story || "", status: "open" });
    setTitle("");
    setStory("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <img src="https://ucarecdn.com/2f8f4b8f-9c35-4e1b-9c4f-5d8e8f8e8f8e/-/format/auto/-/quality/smart/mission127-logo-white.png" alt="Mission 1:27" className="h-40 mx-auto" />
          <h1 className="text-5xl font-bold text-gray-900 mt-6">Mission 1:27</h1>
          <p className="text-xl text-gray-600 mt-4 max-w-4xl mx-auto">
            “Pure and undefiled religion before God the Father is this: to care for orphans and widows in their distress…” — James 1:27
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Submit Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-10 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Submit a New Need</h2>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Need title…" className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-6 text-lg" />
          <textarea value={story} onChange={e => setStory(e.target.value)} placeholder="Details, location, urgency…" rows={6} className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg resize-none" />
          <button onClick={addNeed} className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-lg text-xl transition">
            Submit Need
          </button>
        </div>

        {/* Needs */}
        <div className="space-y-8">
          {needs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-20 text-center">
              <p className="text-2xl text-gray-500">No active needs right now</p>
            </div>
          ) : (
            needs.map(n => (
              <div key
