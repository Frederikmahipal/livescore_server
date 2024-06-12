import axios from 'axios';

const API_KEY = 'c89013a3a2dc4bba86b37a398eaab5c0'; 

export async function fetchMatches() {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/CL/matches', {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log('RETRIEVED MATCH DATA');
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

export async function fetchTeamById(id) {
  try {
    const response = await axios.get(`https://api.football-data.org/v4/teams/${id}`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching team by id');
  }
}

export async function fetchStandings() {
  try {
    const response = await axios.get(`https://api.football-data.org/v2/competitions/EC/standings`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log('RETRIEVED STANDINGS');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching standings');
  }
}