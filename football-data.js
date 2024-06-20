import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

var cashedMatches;

export async function fetchMatches() {

  // if (cashedMatches) {
  //   return cashedMatches;
  // }

  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/EC/matches', {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log('RETRIEVED MATCH DATA');
    cashedMatches = response.data;
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching match data');
  }
}

export async function fetchMatchDetails(id) {
  try {
    const response = await axios.get(`https://api.football-data.org/v4/matches/${id}`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log('RETRIEVED MATCH DETAILS');

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching match details');
  }
}

export async function fetchTeamDetails(id) {
  try {
    const response = await axios.get(`https://api.football-data.org/v4/teams/${id}`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log('RETRIEVED TEAM DETAILS');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching team details');
  }
}
