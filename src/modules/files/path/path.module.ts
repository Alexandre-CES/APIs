import { Router } from "express";
import { PathController } from "./path.controller";
import { PathService } from "./path.service";
import { Request, Response } from "express";

const pathController = new PathController(new PathService());

const router = Router();

router.post('/set',
    (req:Request,res:Response)=> pathController.setDirPath(req,res)
);
router.get('/get',
    (req:Request,res:Response)=> pathController.getDirPath(req,res)
);

export default router;