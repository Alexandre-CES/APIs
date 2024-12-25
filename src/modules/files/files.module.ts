import { Router } from 'express';
import { pathRouter } from './path/path.module';
import { organizerRouter } from './organizer/organizer.module';
import { deleterRouter } from './deleter/deleter.module';
import { analyzerRouter } from './analyzer/analyzer.module';

const router = Router();

router.use('/path', pathRouter);
router.use('/organizer', organizerRouter);
router.use('/deleter', deleterRouter);
router.use('/analyzer', analyzerRouter);

export default router;
