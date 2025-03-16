async function addEmbedding(db, table, id, embedding) {
    try {
      const query = `
        UPDATE ${table}
        SET embedding = $1
        WHERE id = $2
      `;
      await db.none(query, [embedding, id]);
      console.log(`Embedding added to ${table} with ID ${id}`);
    } catch (error) {
      console.error(`Error adding embedding to ${table}:`, error);
      throw error; // Rethrow the error for handling elsewhere
    }
  }
  
  module.exports = addEmbedding;