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

router.use('/getSize',
    asyncHandler((req: Request, res:Response) => analyzerController.getSize(req,res))
);

export {router as analyzerRouter};