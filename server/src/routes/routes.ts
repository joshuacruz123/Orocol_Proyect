import { Router } from 'express';
import { getPersonas } from '../controllers/controller';

const router = Router();
router.get('/', getPersonas);

export default router;