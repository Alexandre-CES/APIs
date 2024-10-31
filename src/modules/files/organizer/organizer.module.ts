import { Router } from 'express';
import OrganizerController from './organizer.controller';

const organizerController = new OrganizerController();
const router = Router();

router.get('/', (req, res) => organizerController.organize(req, res));

export default router;
