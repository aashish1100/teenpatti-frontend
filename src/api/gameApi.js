import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const createGame = (players, gameName) =>
  axios.post(`${API}/create`, { players, gameName });

export const addRound = (gameId, roundInfo) =>
  axios.post(`${API}/${gameId}/add-round`, roundInfo);

export const getLedger = (gameId) =>
  axios.get(`${API}/${gameId}/ledger`);

export const getRounds = (gameId) =>
  axios.get(`${API}/${gameId}/rounds`);

export const getAllGames = () =>
  axios.get(`${API}/all`);

export const getGameDetails = (gameId) =>
  axios.get(`${API}/${gameId}/details`);
