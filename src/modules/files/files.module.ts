import { Router } from 'express';
import { pathRouter } from './path/path.module';
import { organizerRouter } from './organizer/organizer.module';

const router = Router();

router.use('/path', pathRouter);
router.use('/organizer', organizerRouter);

export default router;
