import {atom} from "jotai";

export const IssueTypeAtom = atom(1);

export type IssuesType = {
    id:number;
    userId:number;
    // upvotes ?: string[];
    title:string;
    description:string;
    date:string;
    department:string;
    location:string;
    images:string[];
    upvotes:number;
    priority: "high" | "medium" | "low";
    verified:boolean;
    status ?: "listed" | "progress" | "resolved";
    resolved:boolean;
}

export const IssuesAtom = atom<IssuesType[]>(
    [
        {
            id: 1,
            userId: 101,
            title: 'Pothole near Main Street',
            description: 'Large pothole causing traffic disruption and potential vehicle damage.',
            date: '2025-09-10',
            department: 'Road Works',
            location: 'Main St & 2nd Ave',
            images: ['issue1.png', 'issue2.png'],
            upvotes: 12,
            priority: 'high',
            verified: true,
            resolved: true
        },
        {
            id: 2,
            userId: 102,
            title: 'Streetlight not working',
            description: 'Streetlight has been out for a week, creating a safety hazard at night.',
            date: '2025-09-12',
            department: 'Electricity',
            location: 'Park Lane',
            images: ['issue2.png'],
            upvotes: 8,
            priority: 'medium',
            verified: false,
            resolved: true
        },
        {
            id: 3,
            userId: 103,
            title: 'Overflowing garbage bin',
            description: 'Garbage bin has not been cleared, attracting stray animals and foul smell.',
            date: '2025-09-13',
            department: 'Sanitation',
            location: 'Market Road',
            images: ['issue3.png', 'issue1.png', 'issue2.png'],
            upvotes: 20,
            priority: 'high',
            verified: true,
            resolved: true
        },
        {
            id: 4,
            userId: 104,
            title: 'Broken park bench',
            description: 'A wooden bench is broken and poses a risk to park visitors.',
            date: '2025-09-14',
            department: 'Parks & Recreation',
            location: 'Central Park',
            images: ['issue1.png'],
            upvotes: 5,
            priority: 'low',
            verified: false,
            resolved: true
        },
        {
            id: 5,
            userId: 105,
            title: 'Leaking water pipe',
            description: 'Continuous water leakage is wasting water and damaging the pavement.',
            date: '2025-09-15',
            department: 'Water Supply',
            location: '5th Avenue',
            images: ['issue2.png', 'issue3.png'],
            upvotes: 14,
            priority: 'high',
            verified: true,
            resolved: true
        },
        {
            id: 6,
            userId: 106,
            title: 'Illegal dumping of waste',
            description: 'Industrial waste dumped illegally, causing environmental concerns.',
            date: '2025-09-15',
            department: 'Sanitation',
            location: 'Industrial Area',
            images: ['issue3.png'],
            upvotes: 9,
            priority: 'medium',
            verified: false,
            resolved: false
        },
        {
            id: 7,
            userId: 107,
            title: 'Fallen tree blocking path',
            description: 'A large tree has fallen, obstructing the walking trail.',
            date: '2025-09-16',
            department: 'Forestry',
            location: 'Greenway Trail',
            images: ['issue1.png', 'issue2.png'],
            upvotes: 18,
            priority: 'high',
            verified: true,
            resolved: false
        },
        {
            id: 8,
            userId: 108,
            title: 'Broken traffic signal',
            description: 'Traffic light malfunctioning, creating confusion and potential accidents.',
            date: '2025-09-16',
            department: 'Traffic Control',
            location: 'Oak Street',
            images: ['issue2.png'],
            upvotes: 11,
            priority: 'medium',
            verified: true,
            resolved: false
        },
        {
            id: 9,
            userId: 109,
            title: 'Graffiti on public wall',
            description: 'Unauthorized graffiti on public property requires cleaning or repainting.',
            date: '2025-09-17',
            department: 'Public Works',
            location: 'River Road',
            images: ['issue1.png', 'issue3.png'],
            upvotes: 6,
            priority: 'low',
            verified: false,
            resolved: false
        },
        {
            id: 10,
            userId: 110,
            title: 'Damaged footpath tiles',
            description: 'Loose and cracked tiles making the footpath unsafe for pedestrians.',
            date: '2025-09-18',
            department: 'Infrastructure',
            location: 'High Street',
            images: ['issue3.png', 'issue2.png'],
            upvotes: 15,
            priority: 'medium',
            verified: true,
            resolved: false
        }
    ]
);
