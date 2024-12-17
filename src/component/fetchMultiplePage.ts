// Define the Artwork type
interface Artwork {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: string;
    date_end: string;
  }
  
  // Define the structure of the API response data
  interface ApiResponse {
    data: Artwork[];
    pagination: {
      total_pages: number;
      total: number;
    };
  }
  
  /**
   * Fetch artworks from the API based on the given range of rows.
   *
   * @param {number} startRow - The starting row number (0-based index).
   * @param {number} endRow - The ending row number (inclusive, 0-based index).
   * @returns {Promise<Artwork[]>} - Returns a promise that resolves to an array of artworks.
   */
  export async function fetchArtworksByRange(startRow: number, endRow: number): Promise<Artwork[]> {
    const pageSize = 12; // Rows per page, adjust as needed
    const startPage = Math.floor(startRow / pageSize) + 1; // Calculate the start page number
    const endPage = Math.floor(endRow / pageSize) + 1; // Calculate the end page number
    
    const artworks: Artwork[] = [];
    
    try {
      // Fetch data for each page needed to cover the range
      for (let page = startPage; page <= endPage; page++) {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
        const data: ApiResponse = await response.json();
        
        // Determine the index range within this page
        const pageStartRow = page === startPage ? startRow % pageSize : 0;
        const pageEndRow = page === endPage ? endRow % pageSize + 1 : pageSize;
  
        // Extract artworks for the range on this page
        const pageArtworks = data.data.slice(pageStartRow, pageEndRow);
        artworks.push(...pageArtworks);
      }
  
      return artworks;
    } catch (error) {
      console.error("Error fetching artworks:", error);
      throw error;
    }
  }
  