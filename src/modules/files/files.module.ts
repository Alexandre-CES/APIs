import { Router } from 'express';
import { pathRouter } from './path/path.module';
import deleterRouter from './deleter/deleter.module';

const router = Router();

router.use('/path', pathRouter);
router.use('/deleter', deleterRouter);

export default router;
