import { openDB } from 'idb';

const initdb = async () => {
  console.log('Before initializing the database 1');
  await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  console.log('After initializing the database 2');
};

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (newContent) => {
  console.log('PUT to the database');
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  const existingData = await store.getAll();
  if (existingData) {
    existingData.content = newContent;
    const request = store.put(existingData);
    const result = await request;
    console.log('Result:', result);
    return result;
  } else {
    const request = store.put({content});

    const result = await request;
    console.log('result', result);
    return result;
  }
  
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET from the database');
    const editorDb = await openDB('jate', 1);
    const tx = editorDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    const request = store.getAll();

    const result = await request;
    console.log('result.value', result[0].content);
    return result[0].content;
    
  } catch (err) {
    console.log('getDb error------');
    console.log(err);
  }
  
};


await initdb();