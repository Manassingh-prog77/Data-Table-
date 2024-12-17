import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect, useRef } from "react";
import { Paginator } from "primereact/paginator";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from "primereact/button";
import { fetchArtworksByRange } from "./fetchMultiplePage";

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

interface PageEvent {
  first: number;
  rows: number;
  page: number; // Page number
}

export default function Table() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [inputRow, setInputRow] = useState<number>(); // state to capture user input
  const op = useRef<OverlayPanel | null>(null);

  // Fetching artworks data for a specific page
  const fetchArtworks = async (page: number) => {
    setLoading(true); // Set loading state before fetching
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
      const data = await response.json();
      setArtworks(data.data);
      setTotalPages(data.pagination.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the data for the first page on initial load
    fetchArtworks(1);
  }, []);

  // Handle pagination change
  const onPageChange = (event: PageEvent) => {
    const page = Math.floor(event.first / event.rows) + 1; // Calculate the page number based on first and rows
    console.log(page);
    setFirst(event.first);
    setRows(event.rows);
    fetchArtworks(page); // Fetch data for the new page
    console.log(artworks);
  };

  // Handle input row change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) {
      setInputRow(Number(value) || 0); // Reset if value is invalid or empty
    }
  };

   // Handle select row action based on input
   const handleSelectRow = async () => {
    const rowCount = Number(inputRow);
    if (!isNaN(rowCount) && rowCount > 0) {
      const startRow = 0;
      const endRow = rowCount - 1;
      try {
        const fetchedArtworks = await fetchArtworksByRange(startRow, endRow);
        console.log(fetchedArtworks)
        setSelectedArtworks(fetchedArtworks); // Set the selected rows
      } catch (error) {
        console.error("Error fetching selected rows:", error);
      }
    } else {
      alert("Please enter a valid number");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen bg-gray-100 px-4">
      <div className="card bg-white shadow-2xl p-6 w-full mb-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center mb-8 shadow-md">
  Artwork Collection
</h1>


        <DataTable
          value={artworks}
          selectionMode="multiple"
          selection={selectedArtworks}
          onSelectionChange={(e) => setSelectedArtworks(e.value as Artwork[])}
          dataKey="id"
          className="p-datatable-sm"
          tableStyle={{ width: "100%", borderRadius: "10px", border: "1px solid #e5e7eb" }}
        >
          <Column
            selectionMode="multiple"
            header={
              <div className="flex items-center">
                <Button
                  className="text-white p-2 rounded-full hover:bg-blue-600"
                  onClick={(e) => op.current && op.current.toggle(e)}
                >
                  <i className="fa-solid fa-caret-down"></i>
                </Button>
                <OverlayPanel ref={op}>
  <div className="p-inputgroup flex flex-col items-center bg-white p-2 rounded-md shadow-md">
    <input
      type="text"
      value={inputRow}
      onChange={handleInputChange}
      className="p-inputtext border border-gray-300 rounded px-2 py-1 mb-2 w-full"
      placeholder="Select rows..."
    />
    <button
      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
      onClick={handleSelectRow}
    >
      Submit
    </button>
  </div>
</OverlayPanel>

              </div>
            }
            headerStyle={{
              width: "3rem",
              backgroundColor: "#4A90E2",
              color: "white",
              fontWeight: "bold",
            }}
            bodyStyle={{ backgroundColor: "#f9f9f9", color: "black", textAlign: "center" }}
          />
          <Column field="title" header="Title" headerStyle={headerStyle} bodyStyle={bodyStyle} />
          <Column field="place_of_origin" header="Place of Origin" headerStyle={headerStyle} bodyStyle={bodyStyle} />
          <Column field="artist_display" header="Artist" headerStyle={headerStyle} bodyStyle={bodyStyle} />
          <Column field="inscriptions" header="Inscriptions" headerStyle={headerStyle} bodyStyle={bodyStyle} />
          <Column field="date_start" header="Start Date" headerStyle={headerStyle} bodyStyle={bodyStyle} />
          <Column field="date_end" header="End Date" headerStyle={headerStyle} bodyStyle={bodyStyle} />
        </DataTable>
      </div>

      {/* Pagination */}
      <div className="card bg-white shadow-lg p-4 flex justify-center items-center">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalPages * rows}
          onPageChange={onPageChange}
          className="p-mt-4"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          leftContent={
            <span className="text-sm text-gray-600">
              Items:{" "}
              <strong>
                {first + 1} to {Math.min(first + rows, totalPages * rows)}
              </strong>{" "}
              of <strong>{totalPages * rows}</strong>
            </span>
          }
          rightContent={
            <span className="text-sm text-gray-600">
              <strong>Total Pages: {totalPages}</strong>
            </span>
          }
        />
      </div>
    </div>
  );
}

// Common styles for columns
const headerStyle = {
  backgroundColor: "#4A90E2",
  color: "white",
  fontWeight: "bold",
};

const bodyStyle = {
  backgroundColor: "#f9f9f9",
  color: "black",
};
