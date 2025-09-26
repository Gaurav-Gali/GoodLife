"use client";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { getIssuesByDepartment } from "@/utils/getIssues";
import IssueDetail from "./components/IssueDetail";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IssuesMap from "./components/IssuesMap";
import WeeklyProgressChart from "./components/WeeklyProgressChart";

export default function Dashboard() {
  const { user } = useUser();
  const meta = user?.publicMetadata as { department?: string };
  const department = meta?.department;

  const issues = getIssuesByDepartment(department);
  const [selectedIssue, setSelectedIssue] = useState<null | any>(null);

  // filters & sorting state
  const [showResolved, setShowResolved] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  if (!issues) {
    return (
      <div className="text-center text-gray-700 mt-20">
        This page is restricted only to admins.
      </div>
    );
  }

  // filter issues
  let filteredIssues = issues.filter((issue) =>
    showResolved ? issue.status === "resolved" : issue.status !== "resolved"
  );

  // apply sorting based on upvotes count
  if (sortOrder) {
    filteredIssues = [...filteredIssues].sort((a, b) =>
      sortOrder === "asc"
        ? a.upvotes.length - b.upvotes.length
        : b.upvotes.length - a.upvotes.length
    );
  }

  return (
    <main className="p-8 mt-5">
      {/* Header */}
      {/* <div className="flex  justify-start items-start mt-25">
        <h1 className="text-3xl text-zinc-500 font-thin relative left-160">
          {department !== "super" ? `${department} department` : "Super admin"}
        </h1>
      </div> */}
    <div className="flex items-center gap-5">
        <div className="w-8/12">
            <IssuesMap
            issues={filteredIssues.map((issue) => ({
                ...issue,
                coordinates: [issue.coordinates[0], issue.coordinates[1]] as [number, number],
                priority: issue.priority as "high" | "medium" | "low",
                status: issue.status as "listed" | "progress" | "resolved",
            }))}
            />
        </div>
        <div className="w-4/12 mt-5">
            <WeeklyProgressChart/>
        </div>
    </div>


      {/* Filters */}
      <div className="flex gap-4 mt-6 max-w-7xl mx-auto px-6">
        <button
          className={`px-4 py-2 rounded-full ${
            !showResolved
              ? "bg-blue-500 text-white font-thin"
              : "bg-gray-100 text-gray-700 font-thin"
          }`}
          onClick={() => setShowResolved(false)}
        >
          Not Resolved
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            showResolved
              ? "bg-blue-500 text-white font-thin"
              : "bg-gray-100 text-gray-700 font-thin"
          }`}
          onClick={() => setShowResolved(true)}
        >
          Resolved
        </button>

        <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto border-none bg-zinc-200 rounded-lg px-3 py-2">
            {sortOrder === "" ? "Sort by upvotes" : sortOrder === "asc" ? "Increasing" : "Decreasing"}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by Upvotes</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSortOrder("")}>Default</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>Increasing</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>Decreasing</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Issues Table */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Upvotes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow
                key={issue.id}
                className="cursor-pointer"
                onClick={() => setSelectedIssue(issue)}
              >
                <TableCell className="font-medium text-blue-500">
                  {issue.title}
                </TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>{issue.location}</TableCell>
                <TableCell>{issue.date}</TableCell>
                <TableCell>
                  <span
                    className={
                      issue.priority === "high"
                        ? "text-red-600"
                        : issue.priority === "medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {issue.priority}
                  </span>
                </TableCell>
                <TableCell>{issue.upvotes.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal / Popup */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-11/12 max-w-5xl p-10 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-l cursor-pointer font-bold"
              onClick={() => setSelectedIssue(null)}
            >
              ✕
            </button>
            <IssueDetail issue={selectedIssue} />
          </div>
        </div>
      )}
    </main>
  );
}
