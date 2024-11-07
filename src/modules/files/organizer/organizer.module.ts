import { Router } from 'express';
import { asyncHandler } from '../../../middlewares/asyncHandler';
import { Request, Response } from 'express-serve-static-core';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';
import { pathService } from '../path/path.module';

const organizerService = new OrganizerService();

const organizerController = new OrganizerController(
    organizerService,
    pathService
);

const router = Router();

router.get('/', asyncHandler((req: Request, res: Response) => organizerController.organize(req, res)));

export {router as organizerRouter};
