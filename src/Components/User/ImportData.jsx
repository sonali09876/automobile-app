import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import httpClient from "../../api/axios";

export default function ImportData() {
  const [automobiles, setAutomobiles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Load data from API with pagination parameters
  const loadDataFromAPI = async () => {
    try {
      setLoading(true);
      setApiMessage("");

      const response = await httpClient.get(`/vehicles`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      });

      setAutomobiles(response.data.data || []);
      setFilteredData(response.data.data || []);

      // Map backend pagination data to frontend state
      if (response.data.pagination) {
        setPagination((prev) => ({
          ...prev,
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.pages,
        }));
      }

      setApiMessage("Data loaded successfully!");
    } catch (error) {
      console.error("Error loading data from API:", error);
      setApiMessage("Error loading data from server");
      loadDataFromLocal();
    } finally {
      setLoading(false);
    }
  };

  // Fallback: Load from localStorage
  const loadDataFromLocal = () => {
    try {
      const localData = localStorage.getItem("vehicleData");
      if (localData) {
        const parsed = JSON.parse(localData);
        setAutomobiles(parsed);
        setFilteredData(parsed);
        setApiMessage("Loaded data from local storage");
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  };

  useEffect(() => {
    loadDataFromAPI();
  }, [pagination.page, pagination.limit]);

  // Read Excel file and parse to JSON
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls")
    ) {
      alert("Please upload a valid Excel file (.xls or .xlsx)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log("Parsed Excel Data:", jsonData);

      setAutomobiles(jsonData);
      setFilteredData(jsonData);
      setApiMessage(`Imported ${jsonData.length} records from Excel`);
    };
    reader.readAsBinaryString(file);
  };

  const handleRefresh = () => {
    loadDataFromAPI();
  };

  // Handle page changes, update state triggers reload via useEffect
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-tr from-blue-50 via-sky-100 to-blue-200 p-4">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-xl p-6 mt-10">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center tracking-tight">
          Vehicle Data
        </h2>

        {/* Status Message */}
        {apiMessage && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              apiMessage.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {apiMessage}
          </div>
        )}

        {/* Upload Excel File */}
        <div className="mb-6 flex flex-col items-center">
          <label className="mb-2 text-lg font-medium text-sky-900">
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="block w-full max-w-md text-sm text-sky-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-sky-100 file:text-sky-700
              hover:file:bg-sky-200
              transition duration-150 ease-in-out
              mb-2
            "
          />
          <span className="text-xs text-sky-500">
            (Only Excel files: .xls, .xlsx)
          </span>
        </div>

        {/* Control Buttons */}
        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 
              disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? "Loading..." : "Refresh Data"}
          </button>

          <div className="flex gap-2 border border-sky-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 transition ${
                viewMode === "cards"
                  ? "bg-sky-600 text-white"
                  : "bg-white text-sky-600 hover:bg-sky-50"
              }`}
            >
              Cards View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 transition ${
                viewMode === "table"
                  ? "bg-sky-600 text-white"
                  : "bg-white text-sky-600 hover:bg-sky-50"
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Data Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-sky-600 border-t-transparent"></div>
            <p className="mt-4 text-sky-600 text-lg">Loading vehicles...</p>
          </div>
        ) : filteredData.length > 0 ? (
          <>
            {/* CARDS VIEW */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {filteredData.map((vehicle, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-sky-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-sky-800">
                        {vehicle.productName || vehicle.model || `Vehicle ${index + 1}`}
                      </h3>
                      <span className="px-3 py-1 bg-sky-600 text-white text-xs rounded-full">
                        ID: {vehicle._id || (pagination.page - 1) * pagination.limit + index + 1}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(vehicle).map(([key, value]) => {
                        if (["_id", "productName", "model"].includes(key)) return null;
                        return (
                          <div
                            key={key}
                            className="flex justify-between items-center py-2 border-b border-sky-100"
                          >
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span className="text-sm text-gray-800 font-semibold">{String(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TABLE VIEW */}
            {viewMode === "table" && (
              <div className="overflow-x-auto mb-6 rounded-lg border border-sky-200">
                <table className="min-w-full bg-white">
                  <thead className="bg-gradient-to-r from-sky-600 to-sky-700 text-white">
                    <tr>
                      {Object.keys(filteredData[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                        >
                          {key.replace(/_/g, " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100">
                    {filteredData.map((row, index) => (
                      <tr key={index} className="hover:bg-sky-50 transition-colors">
                        {Object.values(row).map((value, idx) => (
                          <td
                            key={idx}
                            className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                          >
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 
                    disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200
                    shadow-md hover:shadow-lg"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sky-700 font-medium">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <span className="text-gray-500 text-sm">({pagination.total} total records)</span>
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 
                    disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200
                    shadow-md hover:shadow-lg"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm mt-2">Upload an Excel file or load from API</p>
          </div>
        )}
      </div>
    </div>
  );
}
