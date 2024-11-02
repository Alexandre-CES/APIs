import { Router } from 'express';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';
import { asyncHandler } from '../../../middlewares/asyncHandler';
import { Request, Response } from 'express-serve-static-core';

const organizerController = new OrganizerController(new OrganizerService());
const router = Router();

router.post('/', asyncHandler((req: Request, res: Response) => organizerController.organize(req, res)));

export default router;
