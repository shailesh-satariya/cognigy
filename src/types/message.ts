export interface Message {
    id: string;
    text: string;
    from: "user" | "bot";
}