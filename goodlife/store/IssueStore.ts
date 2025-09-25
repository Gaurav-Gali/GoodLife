import {atom} from "jotai";

export const IssueTypeAtom = atom(1);

export type IssuesType = {
    id:number;
    userId:string;
    upvotes : string[];
    title:string;
    description:string;
    date:string;
    department:string;
    coordinates:number[];
    location:string;
    images:string[];
    priority: "high" | "medium" | "low";
    verified:boolean;
    status : "listed" | "progress" | "resolved";
}