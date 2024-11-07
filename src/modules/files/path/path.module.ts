import { Router } from "express";
import { PathController } from "./path.controller";
import { PathService } from "./path.service";
import { Request, Response } from "express";

const pathService = new PathService();
const pathController = new PathController(pathService);

const router = Router();

router.post('/set',
    (req:Request,res:Response) => pathController.setDirPath(req,res)
);
router.get('/get',
    (req:Request,res:Response) => pathController.getDirPath(req,res)
);

export {router as pathRouter};