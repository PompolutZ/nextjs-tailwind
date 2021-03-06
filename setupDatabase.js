const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
    const db = await open({ filename: './public/db/test-db.sqlite', driver: sqlite3.Database });
    await db.migrate({ force: true });

    const data = await db.all('SELECT * FROM migrations');
    console.log(JSON.stringify(data, 2, null));
}

setup();