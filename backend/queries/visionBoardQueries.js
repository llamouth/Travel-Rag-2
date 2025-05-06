const db = require('../db/dbConfig');

// --------------------- VISION BOARDS ---------------------

// Get all boards
const getAllVisionBoards = async () => {
  try {
    return await db.any('SELECT * FROM vision_boards ORDER BY created_at DESC');
  } catch (err) {
    throw err;
  }
};

// Get board by ID
const getVisionBoardById = async (id) => {
  try {
    return await db.oneOrNone('SELECT * FROM vision_boards WHERE id = $1', [id]);
  } catch (err) {
    throw err;
  }
};

// Create board
const createVisionBoard = async ({ user_id, title, description }) => {
  try {
    return await db.one(
      'INSERT INTO vision_boards (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title, description]
    );
  } catch (err) {
    throw err;
  }
};

// Update board
const updateVisionBoard = async (id, { title, description }) => {
  try {
    return await db.oneOrNone(
      'UPDATE vision_boards SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
  } catch (err) {
    throw err;
  }
};

// Delete board
const deleteVisionBoard = async (id) => {
  try {
    return await db.oneOrNone('DELETE FROM vision_boards WHERE id = $1 RETURNING *', [id]);
  } catch (err) {
    throw err;
  }
};

// --------------------- VISION BOARD ITEMS ---------------------

// Get items for a specific board
const getItemsForBoard = async (board_id) => {
  try {
    return await db.any(
      'SELECT * FROM vision_board_items WHERE board_id = $1 ORDER BY order_index ASC',
      [board_id]
    );
  } catch (err) {
    throw err;
  }
};

// Add item to a board
const addItemToBoard = async ({ board_id, image_url, location_name, note, link_url, order_index }) => {
  try {
    return await db.one(
      `INSERT INTO vision_board_items 
        (board_id, image_url, location_name, note, link_url, order_index)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [board_id, image_url, location_name, note, link_url, order_index]
    );
  } catch (err) {
    throw err;
  }
};

// Update a specific item
const updateBoardItem = async (item_id, updates) => {
  const { image_url, location_name, note, link_url, order_index } = updates;
  try {
    return await db.oneOrNone(
      `UPDATE vision_board_items
       SET image_url = $1, location_name = $2, note = $3, link_url = $4, order_index = $5
       WHERE id = $6 RETURNING *`,
      [image_url, location_name, note, link_url, order_index, item_id]
    );
  } catch (err) {
    throw err;
  }
};

// Delete an item
const deleteBoardItem = async (item_id) => {
  try {
    return await db.oneOrNone('DELETE FROM vision_board_items WHERE id = $1 RETURNING *', [item_id]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllVisionBoards,
  getVisionBoardById,
  createVisionBoard,
  updateVisionBoard,
  deleteVisionBoard,
  getItemsForBoard,
  addItemToBoard,
  updateBoardItem,
  deleteBoardItem
};
