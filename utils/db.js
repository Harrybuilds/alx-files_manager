#!/usr/bin/node

import pkg from 'mongodb';
import dotenv from 'dotenv';

const { MongoClient } = pkg;
dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.dbName = database;

    // Connect to MongoDB
    this.connected = false; // Track connection status
    this.client.connect()
      .then(() => {
        console.log('MongoDB client connected successfully');
        this.connected = true;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message);
      });
  }

  /**
   * Check if MongoDB client is connected
   * @returns {boolean} true if connected, otherwise false
   */
  async isAlive() {
    try {
      if (!this.connected) return false;
      await this.client.db(this.dbName).command({ ping: 1 });
      return true;
    } catch (error) {
      console.error('MongoDB ping failed:', error.message);
      return false;
    }
  }

  /**
   * Get the number of documents in the users collection
   * @returns {Promise<number>}
   */
  async nbUsers() {
    try {
      if (!this.connected) throw new Error('MongoDB client not connected');
      const db = this.client.db(this.dbName);
      return await db.collection('users').countDocuments();
    } catch (error) {
      console.error('Error counting users:', error.message);
      return 0;
    }
  }

  /**
   * Get the number of documents in the files collection
   * @returns {Promise<number>}
   */
  async nbFiles() {
    try {
      if (!this.connected) throw new Error('MongoDB client not connected');
      const db = this.client.db(this.dbName);
      return await db.collection('files').countDocuments();
    } catch (error) {
      console.error('Error counting files:', error.message);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
