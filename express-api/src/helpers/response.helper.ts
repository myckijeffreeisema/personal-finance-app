import express from "express";


export function sendResponse(
    res: express.Response,
    code: string,
    status: number,
    data: any | null = null
) {
    return res.status(status).json({ code, status, data });
}