import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
    return res.status(200).send('hihi');
})

export const v1 = router;
