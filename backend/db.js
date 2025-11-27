import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {
  return open({
    filename: "./planner.db",
    driver: sqlite3.Database
  });
}

// Initialize DB tables
export async function initDB() {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS subjects(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      date TEXT
    );
    CREATE TABLE IF NOT EXISTS notes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    );
  `);
}

initDB();
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {
  return open({
    filename: "./planner.db",
    driver: sqlite3.Database
  });
}

// Initialize DB tables
export async function initDB() {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS subjects(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      date TEXT
    );
    CREATE TABLE IF NOT EXISTS notes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    );
  `);
}

initDB();
