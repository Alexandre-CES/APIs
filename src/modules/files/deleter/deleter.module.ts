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
    asyncHandler((req:Request,res:Response) => deleterController.deleteAllDirFiles(req,res))
);
router.post('/lastAccessedAfterDate',
    asyncHandler((req:Request, res:Response) => deleterController.deleteFilesLastAccessedAfterDate(req,res))
);

router.post('/lastAccessedBeforeDate',
    asyncHandler((req:Request, res:Response) => deleterController.deleteFilesLastAccessedBeforeDate(req,res))
);

router.post('/createdAfterDate',
    asyncHandler((req:Request, res:Response) => deleterController.deleteFilesCreatedAfterDate(req,res))
)

router.post('/createdBeforeDate',
    asyncHandler((req:Request, res:Response) => deleterController.deleteFilesCreatedBeforeDate(req,res))
)

router.post('/extensions',
    asyncHandler((req:Request,res:Response) => deleterController.deleteDirFilesByExtensions(req,res))
);

export {router as deleterRouter};

