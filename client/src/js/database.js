import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

// Connects MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/text-edit',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  },
);

export const initDb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

export const putDb = async (content) => {
  console.log('POST to the database');

  // Creates a connection to the database
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.add(content);

  const result = await request;
  console.log('🚀 - data saved to the database', result);
}





// Pulls all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  console.log('result.value', result);
  return result;
};

initDb();