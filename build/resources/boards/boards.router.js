import { Router } from 'express';
import { getBoardById, deleteBoard, updateBoard, getAllBoards, createBoard, } from './boards.service';
const router = Router();
router.route('/').get(async (_req, res) => {
    const boards = await getAllBoards();
    return res.status(200).json(boards);
});
router.route('/').post(async (req, res) => {
    const { title, columns } = req.body;
    const candidate = await createBoard(title, columns);
    return res.status(201).json(candidate);
});
router.route('/:id').get(async (req, res) => {
    const candidate = await getBoardById('boards', req.params.id);
    if (candidate)
        return res.status(200).json(candidate);
    return res.status(404).json({ msg: 'Board not found' });
});
router.route('/:id').put(async (req, res) => {
    const candidate = await updateBoard(req.body, req.params.id);
    if (candidate)
        return res.status(200).json(candidate);
    return res.status(400).json({ msg: 'Bad request' });
});
router.route('/:id').delete(async (req, res) => {
    const candidate = await deleteBoard('boards', req.params.id);
    if (candidate) {
        return res.status(200).json({ msg: 'Board has been deleted' });
    }
    return res.status(404).json({ msg: 'Board not found' });
});
export default router;
