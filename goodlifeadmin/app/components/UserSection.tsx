"use client";

import { useUser, UserButton } from "@clerk/nextjs";

export default function UserSection() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn)
    return (
      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-md">
        Please sign in
      </div>
    );

  return (
    <div className="flex items-center space-x-3 bg-gray-100 text-gray-800 w-40 px-4 py-2 rounded-xl shadow-lg">
      {/* User avatar button */}
      <UserButton
        appearance={{
          elements: {
            userButtonBox: "bg-blue-500 hover:bg-blue-600 rounded-full shadow-sm",
          },
        }}
      />
      {/* Username */}
      <span className="text-gray-900 font-medium">{user.username || user.firstName}</span>
    </div>
  );
}
