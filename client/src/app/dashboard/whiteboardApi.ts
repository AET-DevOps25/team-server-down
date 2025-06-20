
export type Whiteboard = {
    id: number;
    title: string;
    creationTime: string;
    lastEditedTime: string;
    userId: number;
};

const BASE_URL = "http://localhost:8080";

export async function getWhiteboards(userId: number): Promise<Whiteboard[]> {
    const res = await fetch(`${BASE_URL}/whiteboards?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch whiteboards");
    return res.json();
}

export async function createWhiteboard(userId: number, title: string): Promise<Whiteboard> {
    const res = await fetch(`${BASE_URL}/whiteboards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title }),
    });
    if (!res.ok) throw new Error("Failed to create whiteboard");
    return res.json();
}

export async function updateWhiteboardTitle(id: number, title: string): Promise<Whiteboard> {
    const res = await fetch(`${BASE_URL}/whiteboards/${id}/title?title=${encodeURIComponent(title)}`, {
        method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to update title");
    return res.json();
}

export async function deleteWhiteboard(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/whiteboards/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete whiteboard");
}
