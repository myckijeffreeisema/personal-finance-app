export class APIError extends Error{
    code: string;
    status: number;
    data: any | null;

    constructor(code: string, status: number, data: any | null = null) {
        super("Custom API error");
        this.code = code;
        this.status = status;
        this.data = data;
    }
}