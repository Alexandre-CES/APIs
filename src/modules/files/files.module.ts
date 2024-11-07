import { Router } from 'express';
import pathRouter from './path/path.module';

const router = Router();

router.use('/path', pathRouter);

export default router;
