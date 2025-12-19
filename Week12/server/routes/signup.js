import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { findAll, findByOwner, createParticipant, findById, deleteById } from '../repositories/participants.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const data = req.user.role === 'admin' 
      ? await findAll() 
      : await findByOwner(req.user.id);
    res.json(data);
  } catch (e) { res.status(500).json({ error: '讀取失敗' }); }
});

router.post('/', async (req, res) => {
  const { name, department, note } = req.body;
  try {
    const newDoc = await createParticipant({
      name, department, note,
      ownerId: req.user.id,
      userEmail: req.user.email
    });
    res.status(201).json(newDoc);
  } catch (e) { res.status(500).json({ error: '新增失敗' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await findById(req.params.id);
    if (!item) return res.status(404).json({ error: '找不到該資料' });

    if (item.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: '權限不足' });
    }

    await deleteById(req.params.id);
    res.json({ message: '刪除成功' });
  } catch (e) { res.status(500).json({ error: '刪除失敗' }); }
});

export default router;