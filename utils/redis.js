#!/usr/bin/node

// Import required functionalities from redis
import { createClient } from 'redis';

class RedisClient {

    constructor() {

	// creates a redis client instance
	this.redisClient = createClient();

	// listen for connect event
	this.redisClient.on('connect', () => {
	});

	// listen for ready event
	this.redisClient.on('ready', () => {
	});

	// listen for error in event
	this.redisClient.on('error', (err) => {
	    console.error(`Redis client error: ${err.message}`);
	});

    };

    
   /**
    * Check if Redis client is connected
    * @returns {boolean} true if connected, otherwise false
    */
    isAlive () {
	return this.redisClient.connected;
    }


    /**
     * Get the value of a key from Redis
     * @param {string} key - The key to retrieve
     * @returns {Promise<string|null>} The value or null if not found
     */
    async get(key) {
	return new Promise((resolve, reject) => {
	    this.redisClient.get(key, (err, value) => {
		if (err) {
		    console.error(`Error retrieving key ${key}: ${err.message}`);
		    reject(err);
		}else{
		    resolve(value);
		};
	    });
	})
    };


    /**
     * Set a key-value pair in Redis with expiration
     * @param {string} key - The key to set
     * @param {string|number} value - The value to set
     * @param {number} duration - The time-to-live in seconds
     */
    async set(key, value, durationInSeconds) {
	return new Promise((resolve, reject) => {
	    this.redisClient.set(key, value.toString(), 'EX', durationInSeconds, (err) => {
		if (err) {
		    console.error(`Error setting key "${key}": ${err.message}`);
		    reject(err);
		}else{
		    resolve();
		};
	    });
	});
    }

    
    /**
     * Delete a key from Redis
     * @param {string} key - The key to delete
     * @returns {Promise<void>}
     */
    async del(key) {
	return new Promise((resolve, reject) => {
	    this.redisClient.del(key, (err) => {
		if (err) {
		    console.error(`Error deleting key "${key}":`, err.message);
		    reject(err);
		}else{
		    resolve();
		}
	    });
	});
    };
}

const redisClient =  new RedisClient();

export default redisClient

