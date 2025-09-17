import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('📊 Connection string:', process.env.MONGODB_URI ? 'Configured' : 'Not configured');
    
    // URL encode the password to handle special characters
    const connectionString = process.env.MONGODB_URI.replace('<Harshuuu_790233>', encodeURIComponent('Harshuuu_790233'));
    console.log('🔗 Using connection string:', connectionString.substring(0, 50) + '...');
    
    const conn = await mongoose.connect(connectionString, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection state: ${conn.connection.readyState}`);
    
    // Test a simple operation
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📁 Collections in database: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📋 Available collections:');
      collections.forEach(col => console.log(`  - ${col.name}`));
    }
    
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error.message);
    console.error('🔧 Make sure your MongoDB Atlas connection string is correct and the database is accessible');
    process.exit(1);
  }
};

testConnection();
