import { mockIssues } from "@/data/mockIssues";

/**
 * Returns issues based on department.
 * - Only users with a valid department can see issues.
 * - Super admin should have department = "super" in public metadata.
 */
export function getIssuesByDepartment(department?: string) {
  // If department is empty or invalid → block access
  if (!department || department.trim() === "") {
    return null; // Return null or empty to indicate "access denied"
  }

  // Optional: normalize department for safety
  const normalizedDept = department.toLowerCase();

  // Super admin case
  if (normalizedDept === "super") {
    return mockIssues;
  }

  // Department-specific access
  const filtered = mockIssues.filter(
    (issue) => issue.department.toLowerCase() === normalizedDept
  );

  return filtered.length > 0 ? filtered : null; // null if no access
}
