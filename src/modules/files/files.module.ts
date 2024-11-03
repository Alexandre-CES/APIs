import { Router } from 'express';
import organizerRouter from './organizer/organizer.module';
import deleterRouter from './deleter/deleter.module';

const router = Router();

router.use('/organizer', organizerRouter);
router.use('/deleter', deleterRouter);

export default router;
