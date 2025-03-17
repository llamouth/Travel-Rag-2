// controllers/kaggleDataController.js
const {
    getAllKaggleData: getAllKaggleDataQuery,
    getKaggleDataById: getKaggleDataByIdQuery,
    createKaggleData: createKaggleDataQuery,
    updateKaggleData: updateKaggleDataQuery,
    deleteKaggleData: deleteKaggleDataQuery,
  } = require('../queries/kaggleDataQueries');
  
  // Get all kaggle data
  const getAllKaggleData = async (req, res) => {
    try {
      const kaggleData = await getAllKaggleDataQuery();
      res.status(200).json(kaggleData);
    } catch (error) {
      console.error('Error getting all kaggle data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get kaggle data by ID
  const getKaggleDataById = async (req, res) => {
    try {
      const { id } = req.params;
      const kaggleData = await getKaggleDataByIdQuery(id);
      if (kaggleData) {
        res.status(200).json(kaggleData);
      } else {
        res.status(404).json({ error: 'Kaggle data not found' });
      }
    } catch (error) {
      console.error('Error getting kaggle data by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Create kaggle data
  const createKaggleData = async (req, res) => {
    try {
      const kaggleData = await createKaggleDataQuery(req.body); // Assuming req.body contains all kaggle data fields
      res.status(201).json({ data: kaggleData });
    } catch (error) {
      console.error('Error creating kaggle data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update kaggle data
  const updateKaggleData = async (req, res) => {
    try {
      const { id } = req.params;
      const kaggleData = await updateKaggleDataQuery(id, req.body); // Assuming req.body contains all kaggle data fields
      if (kaggleData) {
        res.status(200).json({ data: kaggleData });
      } else {
        res.status(404).json({ error: 'Kaggle data not found' });
      }
    } catch (error) {
      console.error('Error updating kaggle data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete kaggle data
  const deleteKaggleData = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedKaggleData = await deleteKaggleDataQuery(id);
      if (deletedKaggleData) {
        res.status(200).json({ message: 'Kaggle data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Kaggle data not found' });
      }
    } catch (error) {
      console.error('Error deleting kaggle data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getAllKaggleData,
    getKaggleDataById,
    createKaggleData,
    updateKaggleData,
    deleteKaggleData,
  };