import { Router } from 'express';
import organizerRouter from './organizer/organizer.module';

const router = Router();

router.use('/organizer', organizerRouter);

export default router;
