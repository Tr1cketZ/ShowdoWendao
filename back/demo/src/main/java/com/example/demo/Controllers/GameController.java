package com.example.demo.Controllers;

import com.example.demo.Entities.*;
import com.example.demo.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @GetMapping("/questions/{difficultyId}")
    public List<Question> getQuestionsByDifficulty(@PathVariable Long difficultyId) {
        DifficultyLevel difficulty = new DifficultyLevel();
        difficulty.setId(difficultyId);
        return questionRepository.findByDifficulty(difficulty);
    }

    @PostMapping("/score")
    public Score saveScore(@RequestBody Score score) {
        return scoreRepository.save(score);
    }

    @GetMapping("/scores")
    public List<Score> getTopScores() {
        return scoreRepository.findTop10ByOrderByScoreDesc();
    }
}