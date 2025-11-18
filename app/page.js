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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mirror CarePortal */}
      <div className="bg-red-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Connect Churches to Children and Families in Crisis</h2>
          <p className="text-xl text-gray-600 mb-10">Care-sharing technology bringing the Church to the front lines of child welfare</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition">Learn How It Works</button>
        </div>
      </div>

      {/* Submit Need Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Submit a New Need</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Need Title (e.g. Family needs beds for children)"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          />
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Details, location, urgency, prayer requests..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
          <button onClick={addNeed} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-md text-lg transition">
            Submit to Churches
          </button>
        </div>
      </div>

      {/* Needs List Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Open Needs</h3>
        <div className="space-y-6">
          {needs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
              <p className="text-xl text-gray-600">No open needs at this time</p>
            </div>
          ) : (
            needs.map((need) => (
              <div key={need.id} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-gray-900">{need.title}</h4>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">Open</span>
                </div>
                <p className="text-gray-700 text-lg">{need.story || "No details provided."}</p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{new Date(need.created_at).toLocaleString()}</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-md text-lg transition">
                    Respond to Need
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
              }
