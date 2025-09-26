"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Define type compatible with your Dashboard issues
interface Issue {
  id: number;
  userId: string;
  upvotes: string[];
  title: string;
  description: string;
  date: string;
  department: string;
  coordinates: [number, number]; // lat,lng
  location: string;
  images: string[];
  priority: "high" | "medium" | "low";
  verified: boolean;
  status: "listed" | "progress" | "resolved";
}

interface IssuesMapProps {
  issues: Issue[];
}

export default function IssuesMap({ issues }: IssuesMapProps) {
  if (!issues || issues.length === 0) return <div>No issues to display on map.</div>;

  // Only non-resolved issues
  const nonResolved = issues.filter((i) => i.status !== "resolved");

  if (nonResolved.length === 0) return <div>No non-resolved issues to display.</div>;

  // Center map at average coordinates
  const avgLat =
    nonResolved.reduce((sum, i) => sum + i.coordinates[0], 0) / nonResolved.length;
  const avgLng =
    nonResolved.reduce((sum, i) => sum + i.coordinates[1], 0) / nonResolved.length;

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg mt-6">
      <MapContainer
        center={[avgLat, avgLng]}
        zoom={13}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {nonResolved.map((issue) => (
          <Marker key={issue.id} position={issue.coordinates}>
            <Popup>
              <strong>{issue.title}</strong>
              <div>{issue.location}</div>
              <div>Upvotes: {issue.upvotes.length}</div>
              <div>Priority: {issue.priority}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
