"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Logo from "./logo";

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
      {/* Header - CarePortal style */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <Logo />
          <h1 className="text-5xl font-bold text-gray-900 mt-6">Mission 1:27</h1>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            “Pure and undefiled religion before God the Father is this: to care for orphans and widows in their distress…” — James 1:27
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Submit Need - CarePortal card style */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-12 border">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Submit a New Need</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Need Title (e.g. Family of 5 needs beds and winter clothes)"
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
          />
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Details: family size, urgency, location, prayer requests..."
            rows={6}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
          <button
            onClick={addNeed}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-5 rounded-lg transition"
          >
            Submit Need to Churches
          </button>
        </div>

        {/* Needs Feed - Identical to CarePortal */}
        <div className="space-y-8">
          {needs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl shadow">
              <p className="text-2xl text-gray-500">No active needs at this time.</p>
            </div>
          ) : (
            needs.map((need) => (
              <div key={need.id} className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{need.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">Open
