import express from 'express';
import { fetchMatches, fetchMatchDetails, fetchTeamDetails, fetchTeamById, fetchStandings } from '../football-data.js';
import { crawlWebsite } from '../crawler.js';

const router = express.Router();

router.get('/matches', async (req, res) => {
  try {
    const data = await fetchMatches();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching match data' });
  }
});

router.get('/matches/:id', async (req, res) => {
  try {
    const data = await fetchMatchDetails(req.params.id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching match details' });
  }
});

router.get('/teams/:id', async (req, res) => {
  try {
    const data = await fetchTeamDetails(req.params.id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching team details' });
  }
});

router.get('/articles', async (req, res) => {
  try {
    const articles = await crawlWebsite('https://www.skysports.com/football');
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while crawling the website' });
  }
});

router.get('/team/:id', async (req, res) => {
  try {
    const data = await fetchTeamById(req.params.id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching team data' });
  }
});

router.get('/standings', async (req, res) => {
  try {
    const data = await fetchStandings();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching standings' });
  }}
);

export default router;