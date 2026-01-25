import { TavernStatusResponse } from "../types/tavern/TavernStatusResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const tavernService = {
    async getTavernStatus(): Promise<TavernStatusResponse> {
        const res = await fetch(`${apiUrl}/api/tavern/status`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            if (res.status === 403) throw new Error("Session expired or unauthorized");
            throw new Error("Could not fetch tavern data");
        }

        return res.json();
    },
}