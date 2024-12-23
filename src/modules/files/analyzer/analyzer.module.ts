import { Router } from "express";
import { AnalyzerController } from "./analyzer.controller";
import { pathService } from "../path/path.module";
import { AnalyzerService } from "./analyzer.service";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { Request, Response } from "express";

const router = Router();

const analyzerController = new AnalyzerController(
    pathService,
    new AnalyzerService()
)

router.get('/getSize',
    asyncHandler((req: Request, res:Response) => analyzerController.getSize(req,res))
);

router.get('/getDates',
    asyncHandler((req: Request, res:Response) => analyzerController.getDates(req,res))
);

export {router as analyzerRouter};