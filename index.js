const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    rowsAsArray: false
});

module.exports.executeQuery = async (sql) => {
  
  try {
    const connection = pool.promise();
    var [result, fields] = await connection.query(sql)    
  } catch (e) {
    logger.fatal(e.message)
    throw new Error(e.message)
  }
  return result

}

sendQuery = async (connection, sql) => {
  return new Promise((resolve, reject) => {
      connection.query(sql, function(err, res){
          connection.release();
          if(err) {
              return reject(err);
          }
          resolve(res);
      })
  })
}

getConnectionFromPool = async () => {
  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
          if(err){
              return reject(err);
          }
          resolve(connection);
      })
  });
}



