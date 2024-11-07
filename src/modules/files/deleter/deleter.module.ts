import { Router } from "express";
import { Request, Response } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { DeleterController } from "./deleter.controller";
import { DeleterService } from "./deleter.service";
import { pathService } from "../path/path.module";

const router = Router();
const deleterController = new DeleterController(
    new DeleterService(),
    pathService
);

router.get('/all',
    asyncHandler((req:Request,res:Response)=> deleterController.deleteAllDirFiles(req,res))
);
router.post('/fromAccessDate',
    asyncHandler((req:Request, res:Response)=> deleterController.deleteDirFilesFromAccessDate(req,res))
);

router.post('/upToAccessDate',
    asyncHandler((req:Request, res:Response)=> deleterController.deleteDirFilesUpToAccessDate(req,res))
);

export default router;

