const {
    getAllVisionBoards,
    getVisionBoardById,
    createVisionBoard,
    updateVisionBoard,
    deleteVisionBoard,
    getItemsForBoard: getItemsForBoardQuery ,
    addItemToBoard: addItemToBoardQuery,
    updateBoardItem: updateBoardItemQuery,
    deleteBoardItem: deleteBoardItemQuery,
  } = require('../queries/visionBoardQueries');
  
  // Get all boards
  const getAllBoards = async (req, res) => {
    try {
      const boards = await getAllVisionBoards();
      res.status(200).json(boards);
    } catch (error) {
      console.error('Error getting all boards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get board by ID
  const getBoardById = async (req, res) => {
    try {
      const { id } = req.params;
      const board = await getVisionBoardById(id);
      if (board) {
        res.status(200).json(board);
      } else {
        res.status(404).json({ error: 'Board not found' });
      }
    } catch (error) {
      console.error('Error getting board:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Create new board
  const createBoard = async (req, res) => {
    try {
      const board = await createVisionBoard(req.body);
      res.status(201).json(board);
    } catch (error) {
      console.error('Error creating board:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update board
  const updateBoard = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await updateVisionBoard(id, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ error: 'Board not found' });
      }
    } catch (error) {
      console.error('Error updating board:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete board
  const deleteBoard = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteVisionBoard(id);
      if (deleted) {
        res.status(200).json({ message: 'Board deleted successfully' });
      } else {
        res.status(404).json({ error: 'Board not found' });
      }
    } catch (error) {
      console.error('Error deleting board:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get all items for a board
  const getItemsForBoard = async (req, res) => {
    try {
      const { id } = req.params;
      const items = await getItemsForBoardQuery(id);
      res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Add item to a board
  const addItemToBoard = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await addItemToBoardQuery(id, req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update an item
  const updateItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const updated = await updateBoardItemQuery(itemId, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete an item
  const deleteItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const deleted = await deleteBoardItemQuery(itemId);
      if (deleted) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
    getItemsForBoard,
    addItemToBoard,
    updateItem,
    deleteItem
  };
  