// DataParser.js
// Utility functions for fetching and parsing data from JSON files

/**
 * Fetches data from a given JSON file path.
 * @param {string} path - The relative path to the JSON file.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON data.
 */
export const fetchData = async (path) => {
    try {
      // Fetching the data from the provided JSON file path
      const response = await fetch(process.env.PUBLIC_URL + path);
  
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
  
      // Parse the JSON data from the response
      const data = await response.json();
  
      // Validate if the fetched data structure matches expected format
      if (!data.hospital || !Array.isArray(data.hospital.departments)) {
        throw new Error('Invalid data format received. Expected "hospital.departments" structure.');
      }
  
      // Return the parsed data
      return data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in fetchData:', error.message);
      // Optionally, throw the error to handle it further up the call stack
      throw error;
    }
  };
  
  /**
   * Function to filter departments based on a search query.
   * @param {Array} departments - List of departments to filter.
   * @param {string} query - The search term used for filtering.
   * @returns {Array} - Filtered list of departments matching the query.
   */
  export const filterDepartments = (departments, query) => {
    if (!query) return departments; // If no query is provided, return the original list
  
    // Convert the query to lowercase for case-insensitive matching
    const lowerCaseQuery = query.toLowerCase();
  
    // Filter departments based on name, head, or contact number
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(lowerCaseQuery) ||
        dept.head.toLowerCase().includes(lowerCaseQuery) ||
        dept.contact_number.includes(lowerCaseQuery)
    );
  };
  