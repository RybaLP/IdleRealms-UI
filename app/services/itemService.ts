import { SwitchItemRequest } from "../types/item/item";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const itemService = {
    async switchItem(request: SwitchItemRequest) {
        const response = await fetch(`${apiUrl}/api/item/switch`, {
            method: 'PUT',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                action: request.action,
                itemId: request.itemId
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        return await response.json();
    }
}