import "express";

declare global{
    namespace Express{
        interface Request{
            tokenPayload: {
                userId: string;
                jti: string;
            }
        }
    }
}