import db from '../db/db';

export class User {
  static async find(username: string) {
    const queryResult = await db.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    return queryResult[0];
  }
}
