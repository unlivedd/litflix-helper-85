
// This file simulates MongoDB functionality locally using localStorage
// In a real application, this would connect to MongoDB server

// Interface for MongoDB Document
export interface MongoDocument {
  _id?: string;
  [key: string]: any;
}

// Interface for MongoDB Collection
export interface MongoCollection {
  collectionName: string;
  find: (query?: any) => MongoDocument[];
  findOne: (query: any) => MongoDocument | null;
  insertOne: (document: MongoDocument) => { insertedId: string };
  updateOne: (filter: any, update: any) => { matchedCount: number; modifiedCount: number };
  deleteOne: (filter: any) => { deletedCount: number };
}

// Interface for MongoDB Database
export interface MongoDatabase {
  collection: (name: string) => MongoCollection;
}

// Generate a MongoDB-like ObjectId
const generateObjectId = (): string => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  });
};

// Check if an object matches a query
const matchesQuery = (obj: any, query: any): boolean => {
  // Simple implementation to match query conditions
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      if (typeof query[key] === 'object' && !Array.isArray(query[key])) {
        // Handle operators like $eq, $gt, etc.
        for (const op in query[key]) {
          switch(op) {
            case '$eq':
              if (obj[key] !== query[key][op]) return false;
              break;
            case '$gt':
              if (obj[key] <= query[key][op]) return false;
              break;
            case '$lt':
              if (obj[key] >= query[key][op]) return false;
              break;
            // Add more operators as needed
          }
        }
      } else if (obj[key] !== query[key]) {
        return false;
      }
    }
  }
  return true;
};

// Create a MongoDB Collection
const createCollection = (name: string): MongoCollection => {
  // Get data from localStorage
  const getCollectionData = (): MongoDocument[] => {
    const data = localStorage.getItem(`mongodb_${name}`);
    return data ? JSON.parse(data) : [];
  };

  // Save data to localStorage
  const saveCollectionData = (data: MongoDocument[]): void => {
    localStorage.setItem(`mongodb_${name}`, JSON.stringify(data));
  };

  return {
    collectionName: name,
    
    find: (query = {}) => {
      const data = getCollectionData();
      if (Object.keys(query).length === 0) {
        return [...data];
      }
      return data.filter(item => matchesQuery(item, query));
    },
    
    findOne: (query) => {
      const data = getCollectionData();
      return data.find(item => matchesQuery(item, query)) || null;
    },
    
    insertOne: (document) => {
      const data = getCollectionData();
      const newDoc = { ...document };
      if (!newDoc._id) {
        newDoc._id = generateObjectId();
      }
      data.push(newDoc);
      saveCollectionData(data);
      return { insertedId: newDoc._id };
    },
    
    updateOne: (filter, update) => {
      const data = getCollectionData();
      let matchedCount = 0;
      let modifiedCount = 0;
      
      const updatedData = data.map(item => {
        if (matchesQuery(item, filter)) {
          matchedCount++;
          if (update.$set) {
            modifiedCount++;
            return { ...item, ...update.$set };
          }
          // Handle other update operators as needed
        }
        return item;
      });
      
      saveCollectionData(updatedData);
      return { matchedCount, modifiedCount };
    },
    
    deleteOne: (filter) => {
      const data = getCollectionData();
      const initialLength = data.length;
      const newData = data.filter(item => !matchesQuery(item, filter));
      saveCollectionData(newData);
      return { deletedCount: initialLength - newData.length };
    }
  };
};

// MongoDB Client
export const MongoClient = {
  db: (name: string): MongoDatabase => ({
    collection: (collectionName: string): MongoCollection => createCollection(collectionName)
  })
};

// Initialize database with some collections
export const initializeDatabase = () => {
  // Check if database is already initialized
  if (localStorage.getItem('mongodb_initialized') === 'true') {
    return;
  }
  
  // Create users collection if it doesn't exist
  const usersCollection = createCollection('users');
  if (usersCollection.find().length === 0) {
    // Maybe add some initial users
  }
  
  // Mark as initialized
  localStorage.setItem('mongodb_initialized', 'true');
};

// Call this function to initialize the database
initializeDatabase();

// Get MongoDB database instance
export const getDatabase = (): MongoDatabase => {
  return MongoClient.db('litflixdb');
};
