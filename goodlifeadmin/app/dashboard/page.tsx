// app/dashboard/page.tsx (Next.js 13/14 with Clerk)

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [department, setDepartment] = useState<string | null>(null);

  useEffect(() => {
    if (user?.publicMetadata?.department) {
      setDepartment(user.publicMetadata.department as string);
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">No department assigned</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-6 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Common Header */}
        <header className="flex justify-between items-center bg-white shadow rounded-xl px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold">Civic Issue Dashboard</h1>
          <p className="text-sm text-gray-500">
            Logged in as <span className="font-medium">{department}</span>
          </p>
        </header>

        {/* Dashboard Views */}
        {department === "super" ? (
          <SuperAdminDashboard />
        ) : (
          <DepartmentDashboard department={department} />
        )}
      </div>
    </div>
  );
}

// ----------------- Super Admin Dashboard -----------------
function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">All Issues Overview</h2>
        <p className="text-gray-600">
          Super admin can see all reported issues across departments.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Departments</h2>
        <p className="text-gray-600">
          Add/remove department admins and control overall settings.
        </p>
      </div>
    </div>
  );
}

// ----------------- Department Dashboard -----------------
function DepartmentDashboard({ department }: { department: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {department.charAt(0).toUpperCase() + department.slice(1)} Department
        </h2>
        <p className="text-gray-600">
          This dashboard shows issues assigned to the <b>{department}</b>{" "}
          department.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Department Issues</h2>
        <p className="text-gray-600">
          List of issues related to <b>{department}</b> department will be
          displayed here.
        </p>
      </div>
    </div>
  );
}
