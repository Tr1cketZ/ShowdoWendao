const express = require('express');
const bodyParser = require('body-parser');
const { Question } = require('./models');

const app = express();
app.use(bodyParser.json());

// Rota para buscar todas as perguntas
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para adicionar uma nova pergunta
app.post('/questions', async (req, res) => {
  const { question, correctAnswer, optionA, optionB, optionC } = req.body;
  try {
    const newQuestion = await Question.create({
      question,
      correctAnswer,
      optionA,
      optionB,
      optionC,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicializar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
