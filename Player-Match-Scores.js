const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'cricketMatchDetails.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

app.get('/players/', async (request, response) => {
  const getPlayersQuery = `
    SELECT
      player_id as playerId,
      player_name as playerName
    FROM
      player_details
    ORDER BY
      player_id;
  `
  const playersArray = await db.all(getPlayersQuery)
  response.send(playersArray)
})

app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const getPlayersQuery = `
    SELECT
      player_id as playerId,
      player_name as playerName
    FROM
      player_details
    WHERE
      player_id = ${playerId};
  `
  const player = await db.get(getPlayersQuery)
  response.send(player)
})

app.put('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const playerDetails = request.body
  const {playerName} = playerDetails
  const updatePlayerQuery = `
    UPDATE
      player_details
    SET
      player_name = '${playerName}'
    WHERE
      player_id = ${playerId};
  `
  await db.run(updatePlayerQuery)
  response.send('Player Details Updated')
})

app.get('/matches/:matchId/', async (request, response) => {
  const {matchId} = request.params
  const getMatchQuery = `
    SELECT
      match_id as matchId,
      match as match,
      year as year
    FROM
      match_details
    WHERE
      match_id = ${matchId};
  `
  const match = await db.get(getMatchQuery)
  response.send(match)
})

app.get('/players/:playerId/matches', async (request, response) => {
  const {playerId} = request.params
  const getMatchPlayerQuery = `
    SELECT
      match_details.match_id as matchId,
      match_details.match as match,
      match_details.year as year
    FROM
      player_match_score
    NATURAL JOIN
      match_details
    WHERE
      player_match_score.player_id = ${playerId};
  `
  const matches = await db.all(getMatchPlayerQuery)
  response.send(matches)
})

app.get('/matches/:matchId/players', async (request, response) => {
  const {matchId} = request.params
  const getMatchQuery = `
    SELECT
      player_details.player_id as playerId,
      player_details.player_name as playerName
    FROM
      player_match_score
    NATURAL JOIN
      player_details
    WHERE
      player_match_score.match_id = ${matchId};
  `
  const players = await db.all(getMatchQuery)
  response.send(players)
})

app.get('/players/:playerId/playerScores', async (request, response) => {
  const {playerId} = request.params
  const getPlayerQuery = `
    SELECT
      player_details.player_id as playerId,
      player_details.player_name as playerName,
      SUM(player_match_score.score) as totalScore,
      SUM(player_match_score.fours) as totalFours,
      SUM(player_match_score.sixes) as totalSixes
    FROM
      player_match_score
    NATURAL JOIN
      player_details
    WHERE
      player_details.player_id = ${playerId}
    GROUP BY
      player_details.player_id;
  `
  const score = await db.get(getPlayerQuery)
  response.send(score)
})

module.exports = app
