import React, { useState } from "react";
import Preferences from "@/components/Preferences";
import VisionBoard from "@/components/VisionBoard";
import Favorites from "@/components/Favorites";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("preferences");

  const renderContent = () => {
    switch (activeTab) {
      case "preferences":
        return <Preferences />;
      case "vision-board":
        return <VisionBoard />;
      case "favorites":
        return <Favorites />;
      default:
        return <Preferences />;
    }
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 opacity-90 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("preferences")}
            className={`block text-left w-full p-2 rounded ${
              activeTab === "preferences" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab("vision-board")}
            className={`block text-left w-full p-2 rounded ${
              activeTab === "vision-board" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Vision Boards
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`block text-left w-full p-2 rounded ${
              activeTab === "favorites" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Favorites
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}

export default ProfilePage;
