import { Router } from 'express';
import { withLineas } from '../utils/db';

const router = Router();

// Público: listar líneas y detalle por slug
router.get('/', async (_req, res) => {
  const lineas = await withLineas(async (ls) => ls);
  res.json({ ok: true, data: lineas });
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const linea = await withLineas(async (ls) => ls.find(l => l.slug === slug));
  if (!linea) return res.status(404).json({ ok: false, error: 'No encontrada' });
  res.json({ ok: true, data: linea });
});

export default router;
