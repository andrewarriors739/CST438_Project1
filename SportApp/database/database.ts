import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    );
    
    CREATE TABLE IF NOT EXISTS favorite_players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id TEXT UNIQUE,
      player_name TEXT,
      team TEXT,
      image_url TEXT
    );
  `);

  
  
  return db;
};

export const addFavoritePlayer = async (player: any) => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  
  await db.runAsync(
  `INSERT OR REPLACE INTO favorite_players 
  (player_id, player_name, team, image_url) 
  VALUES (?, ?, ?, ?)`,
  [
    player.idPlayer,
    player.strPlayer,
    player.strTeam,
    player.strThumb
  ]
  );
  console.log('Player added to favorites:', player.strPlayer);
  
};


export const removeFavoritePlayer = async (playerId: string) => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  await db.runAsync('DELETE FROM favorite_players WHERE player_id = ?', [playerId]);
  console.log('Player removed from favorites:', playerId);
};

export const isPlayerFavorited = async (playerId: string) => {
  const db = await SQLite.openDatabaseAsync('Users.db');
  const result = await db.getFirstAsync(
    'SELECT player_id FROM favorite_players WHERE player_id = ?',
    [playerId]
  );
  return result !== null;
};


