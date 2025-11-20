// src/components/User/ImportData.jsx

import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ImportData() {
  const [excelData, setExcelData] = useState([]);

  // ------------------ READ EXCEL FILE ------------------
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Accept only Excel files
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
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
      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-tr from-blue-50 via-sky-100 to-blue-200 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 mt-10">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center tracking-tight">Import Product Data</h2>

        {/* Upload Excel File */}
        <div className="mb-8 flex flex-col items-center">
          <label className="mb-2 text-lg font-medium text-sky-900">Upload Excel File</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-sky-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-sky-100 file:text-sky-700
              hover:file:bg-sky-200
              transition duration-150 ease-in-out
              mb-2
            "
          />
          <span className="text-xs text-sky-500">(Only Excel files: .xls, .xlsx)</span>
        </div>

        {/* Preview Table */}
        {excelData.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-sky-100 shadow">
            <table className="min-w-full divide-y divide-sky-200">
              <thead className="bg-sky-100">
                <tr>
                  {Object.keys(excelData[0]).map((key, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left text-xs font-bold text-sky-800 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sky-100">
                {excelData.map((row, i) => (
                  <tr key={i} className="hover:bg-sky-50">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-4 py-2 text-sky-700 whitespace-nowrap">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
