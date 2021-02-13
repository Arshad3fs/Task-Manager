import pg from 'pg';

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const executeQuery = async (query, params) => {    
    
    let resp;    
    const client = await pool.connect();
    try {            
        if( params && params.length > 0 ){
            resp = await client.query(query, params);
        } else {
            resp = await client.query(query);
        }        
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
    return resp;        
}

export { executeQuery };