import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 게시글 등록
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await prisma.article.create({ data: { title, content } });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: "게시글 등록 중 오류 발생" });
  }
});

// 게시글 목록 조회
router.get("/", async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "게시글 조회 중 오류 발생" });
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "게시글 삭제 중 오류 발생" });
  }
});

export default router;
