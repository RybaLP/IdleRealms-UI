import { DungeonDetails } from "../types/dungeon/dungeon";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const dungeonService = {

    async getDungeonStatus (dungeonId : number) : Promise<DungeonDetails>{
        const res = await fetch(`${apiUrl}/api/dungeon/${dungeonId}/details`, {
            method : "GET",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            }
        });

        if (!res.ok) {
             if (res.status === 403) throw new Error("Session expired or unauthorized");
             throw new Error("Could not fetch dungeon data");
        }

        return res.json();
    },

    async fightDungeonMonster (dungeonId : number) {
        const res = await fetch(`${apiUrl}/api/dungeon/${dungeonId}/fight`, {
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            }
        });

        if (!res.ok) {
             if (res.status === 403) throw new Error("Session expired or unauthorized");
             throw new Error("Could not fetch dungeon data");
        }

        return res.json();

    }

}