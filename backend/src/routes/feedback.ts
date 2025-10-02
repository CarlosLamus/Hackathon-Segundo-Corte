import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { withFeedback } from '../utils/db';

const router = Router();
router.post('/',
  body('nombre').isString().isLength({min:2}),
  body('email').isEmail(),
  body('mensaje').isString().isLength({min:5}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok:false, errors: errors.array() });
    const item = { ...req.body, createdAt: new Date().toISOString() };
    await withFeedback(async (arr)=>{ arr.push(item); return undefined; });
    res.status(201).json({ ok:true, data:item });
  }
);
export default router;
