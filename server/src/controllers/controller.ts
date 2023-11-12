import { Request, Response } from "express";

export const getPersonas = (req: Request, res: Response) => {
    res.json({
        msg: "getPersonas"
    })
}