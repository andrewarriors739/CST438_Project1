import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    );
  `);
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorite_players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userid INTEGER NOT NULL,
      player_id TEXT NOT NULL,
      player_name TEXT,
      team TEXT,
      image_url TEXT,
      FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(userid, player_id)
    );
  `);

  
  
  return db;
};

export const addFavoritePlayer = async (player: any, userid: number) => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  
  await db.runAsync(
  `INSERT OR REPLACE INTO favorite_players 
  (userid, player_id, player_name, team, image_url) 
  VALUES (?, ?, ?, ?, ?)`,
  [
    userid,
    player.idPlayer,
    player.strPlayer,
    player.strTeam,
    player.strThumb
  ]
  );
  console.log('Player added to favorites:', player.strPlayer);
  
};


export const isPlayerFavorited = async (playerId: string, userid: number) => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  const result = await db.getFirstAsync(
    'SELECT player_id FROM favorite_players WHERE player_id = ? AND userid = ?',
    [playerId, userid]
  );
  return result !== null;
};

export const getFavoritePlayers = async (userid: number) => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  const result = await db.getAllAsync(
    'SELECT * FROM favorite_players WHERE userid = ?',
    [userid]
  );
  return result;
};


