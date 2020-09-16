const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

export default async (req, res) => {
  if(req.method !== 'GET') {
    res.statusCode = 500;
    res.end('We don\'t support this kind of operations.');
    return;
  }
  
  try {
    const db = await open({ filename: `./public/db/test-db.sqlite`, driver: sqlite3.Database });
    const result = await db.get('SELECT * FROM Fighters');
  
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result, null, 4));
  } catch(e) {
    res.statusCode = 500;
    res.end(JSON.stringify(e, null, 4));
  }
};
