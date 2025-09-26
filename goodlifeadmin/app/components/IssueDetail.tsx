// // app/components/IssueDetail.tsx
// "use client";

// interface IssueDetailProps {
//   issue: {
//     title: string;
//     description: string;
//     location: string;
//     date: string;
//     priority: "high" | "medium" | "low";
//   };
// }

// export default function IssueDetail({ issue }: IssueDetailProps) {
//   return (
//     <div className="flex flex-col gap-4">
//       <h2 className="text-3xl font-bold text-blue-600">{issue.title}</h2>
//       <p className="text-gray-800 text-lg">{issue.description}</p>

//       <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-gray-600 text-sm">
//         <span><strong>Location:</strong> {issue.location}</span>
//         <span><strong>Date:</strong> {issue.date}</span>
//         <span>
//           <strong>Priority:</strong>{" "}
//           <span
//             className={
//               issue.priority === "high"
//                 ? "text-red-600 font-semibold"
//                 : issue.priority === "medium"
//                 ? "text-yellow-600 font-semibold"
//                 : "text-green-600 font-semibold"
//             }
//           >
//             {issue.priority}
//           </span>
//         </span>
//       </div>

//       {/* Additional info can go here */}
//       <div className="mt-4 text-gray-500 text-sm">
//         {/* Placeholder for any extra details */}
//         More details about this issue will appear here.
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { useState } from "react";

interface IssueDetailProps {
  issue: {
    id: number;
    userId: string;
    upvotes: string[];            // array of user IDs who upvoted
    title: string;
    description: string;
    date: string;
    department: string;
    coordinates: [number, number]; // [lat, lng]
    location: string;
    images: string[];
    priority: "high" | "medium" | "low";
    verified: boolean;
    status?: "listed" | "progress" | "resolved";
  };
}

export default function IssueDetail({ issue }: IssueDetailProps) {
  const [lat, lng] = issue.coordinates;
  const [streetView, setStreetView] = useState(false);

  // Toggle function
  const toggleView = () => setStreetView(!streetView);

  // Determine iframe URL based on mode
  const heading = 0;
  const pitch = 0;
  const mapSrc = streetView
  ? `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=${pitch},${heading},0,0,0&z=15&output=svembed`
  : `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="flex flex-col gap-6">
      {/* Title + Verified */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-thin tracking-wide text-blue-600">{issue.title}</h2>
        {issue.verified && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            Verified
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-800 text-lg">{issue.description}</p>

      {/* Images */}
      {/* {issue.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {issue.images.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full h-32 rounded-xl overflow-hidden shadow"
            >
              <Image
                src={src}
                alt={`Issue image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )} */}

      {/* Stats */}
      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
        <span><strong>Department:</strong> {issue.department}</span>
        <span><strong>Date:</strong> {issue.date}</span>
        <span>
          <strong>Priority:</strong>{" "}
          <span
            className={
              issue.priority === "high"
                ? "text-red-600 font-semibold"
                : issue.priority === "medium"
                ? "text-yellow-600 font-semibold"
                : "text-green-600 font-semibold"
            }
          >
            {issue.priority}
          </span>
        </span>
        <span><strong>Upvotes:</strong> {issue.upvotes.length}</span>
      </div>

      {/* Google Map */}
      <div className="flex flex-col w-full">
        <div className="w-full h-64 mt-4 rounded-xl overflow-hidden shadow">
            <iframe
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
            src={mapSrc}
            allowFullScreen
            ></iframe>
        </div>
        <button
            onClick={toggleView}
            className="mt-2 px-4 py-2 w-49 ml-90 bg-blue-400 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
            {streetView ? "Switch to Map View" : "Switch to Street View"}
        </button>
        </div>
    </div>
  );
}
