"use client";
import Image from "next/image";
import StudentList from "./components/StudentList";
import EditProgress from "./components/EditProgress";
import { useState } from "react";
export default function Home() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const onSelect = (id: string, name: string) => {
    setStudentId(id);
    setStudentName(name);
  };
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-indigo-400 text-white p-4 flex items-center">
        {/* Logo Image */}
        <Image
          src="/logo.svg"
          alt="Logo"
          className="h-10 w-10 mr-4"
          width="24"
          height="24"
        />
        {/* Header Text */}
        <h1 className="text-l font-bold">Student Progress Tracker</h1>
      </header>

      {/* Main layout with Sider and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sider */}
        <aside className="w-1/4 bg-white overflow-y-auto">
          <StudentList onSelect={onSelect} />
        </aside>

        {/* Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <EditProgress studentId={studentId} studentName={studentName} />
        </main>
      </div>
    </div>
  );
}
