import express from 'express';
import { fetchMatches, fetchMatchDetails, fetchTeamDetails } from '../football-data.js';
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


router.get('/groups/:id', async (req, res) => {
  try {
    const data = await fetchGroups(req.params.id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching groups' });
  }
});

export default router;