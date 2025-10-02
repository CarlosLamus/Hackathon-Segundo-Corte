import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { authRequired, AuthRequest } from '../middleware/auth';
import { withIncidents } from '../utils/db';
import { Incident } from '../types';
import { v4 as uuid } from 'uuid';

const router = Router();
router.use(authRequired);

router.get('/', async (_req: AuthRequest, res) => {
  const data = await withIncidents(async (inc) => inc);
  res.json({ ok: true, data });
});

router.post('/',
  body('title').isString().isLength({ min: 3 }),
  body('severity').isIn(['LOW','MEDIUM','HIGH','CRITICAL']),
  body('description').isString().isLength({ min: 5 }),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

    const now = new Date().toISOString();
    const item: Incident = {
      id: uuid(),
      title: req.body.title,
      severity: req.body.severity,
      description: req.body.description,
      status: 'OPEN',
      reportedBy: req.user!.id,
      createdAt: now,
      updatedAt: now
    };
    await withIncidents(async (inc) => { inc.push(item); return undefined; });
    res.status(201).json({ ok: true, data: item });
  }
);

router.put('/:id',
  param('id').isUUID(),
  body('title').optional().isString().isLength({ min: 3 }),
  body('severity').optional().isIn(['LOW','MEDIUM','HIGH','CRITICAL']),
  body('description').optional().isString().isLength({ min: 5 }),
  body('status').optional().isIn(['OPEN','IN_PROGRESS','RESOLVED']),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });
    const { id } = req.params;
    const updated = await withIncidents(async (inc) => {
      const i = inc.findIndex(x => x.id === id);
      if (i === -1) throw { status: 404, message: 'No encontrado' };
      inc[i] = { ...inc[i], ...req.body, updatedAt: new Date().toISOString() };
      return inc[i];
    });
    res.json({ ok: true, data: updated });
  }
);

router.delete('/:id', param('id').isUUID(), async (req, res) => {
  const { id } = req.params;
  await withIncidents(async (inc) => {
    const i = inc.findIndex(x => x.id === id);
    if (i === -1) throw { status: 404, message: 'No encontrado' };
    inc.splice(i, 1);
    return undefined;
  });
  res.json({ ok: true });
});

export default router;
