import { Router } from 'express';
import deleterRouter from './deleter/deleter.module';

const router = Router();

router.use('/deleter', deleterRouter);

export default router;
