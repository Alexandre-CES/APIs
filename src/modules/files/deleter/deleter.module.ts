import { Router } from "express";
import { DeleterController } from "./deleter.controller";
import { DeleterService } from "./deleter.service";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { Request, Response } from "express";

const router = Router();
const deleterController = new DeleterController(new DeleterService());

router.post('/all',
    asyncHandler((req:Request,res:Response)=> deleterController.deleteAllDirFiles(req,res))
);
router.post('/fromAccessDate',
    asyncHandler((req:Request, res:Response)=> deleterController.deleteDirFilesFromAccessDate(req,res))
);

router.post('/toAccessDate',
    asyncHandler((req:Request, res:Response)=> deleterController.deleteDirFilesToAccessDate(req,res))
);

export default router;

