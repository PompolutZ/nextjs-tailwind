const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const fs = require('fs');

export default async (req, res) => {
  if(req.method !== 'GET') {
    res.statusCode = 500;
    res.end('We don\'t support this kind of operations.');
    return;
  }
  
  let files;
  let public;
  
  try {
    files = fs.readdirSync(process.cwd());
    public = fs.readdirSync('./public/');

    const db = await open({ filename: `./public/db/test-db.sqlite`, driver: sqlite3.Database });
    const result = await db.get('SELECT * FROM Fighters');
  
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result, null, 4));
  } catch(e) {
    const body = { error: e, files: files, public };
    res.statusCode = 500;
    res.end(JSON.stringify(body, null, 4));
  }
};
