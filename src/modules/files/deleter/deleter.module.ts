import { Router } from "express";
import { DeleterController } from "./deleter.controller";
import { DeleterService } from "./deleter.service";


const router = Router();
const deleterController = new DeleterController(new DeleterService());

export default router;

