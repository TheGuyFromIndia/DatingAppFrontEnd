import { Photo } from "./photo";

export interface Member {
    id: number;
    name: string;
    age: number;
    knownAs: string;
    photoUrl: string;
    created: Date; // ISO date string
    lastActive: Date; // ISO date string
    gender: string;
    introduction?: string;
    interests?: string;
    lookingFor?: string;
    city: string;
    country: string;
    photos: Photo[];
}