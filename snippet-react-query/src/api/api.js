/** @format */

// src/api/api.js
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch all items
export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single item by ID
export const fetchItem = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new item
export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

// Update an item
export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

// Delete an item
export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
