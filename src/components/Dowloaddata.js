import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaFileDownload } from "react-icons/fa";

function DownloadExcel({ json_data }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {

            // console.log("Received json_data:", json_data); 

            const flattenedData = json_data.process_step.map(step => {
                const employeeNames = step.employee.map(emp => emp.name).join(", ");
                return {
                    // projectId: json_data._id,
                    projectName: json_data.name_project,
                    projectStart: json_data.timestart,
                    projectEnd: json_data.endtime,
                    projectStatus: json_data.process_status,
                    stepName: step.name_step,
                    stepStart: step.timestart,
                    stepEnd: step.endtime,
                    stepStatus: step.process_status,
                    employees: employeeNames, // Added employee names
                    startBreak: step.start_break || "N/A", // Handle optional fields
                    endBreak: step.end_break || "N/A"
                };
            });

            if (flattenedData.length === 0) {
                throw new Error('No valid data returned from the API.');
            }

            // Convert JSON to worksheet
            const worksheet = XLSX.utils.json_to_sheet(flattenedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "json_data");

            // Create a temporary file and trigger download
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(dataBlob, 'json_data.xlsx');
        } catch (error) {
            console.error('Error downloading the data:', error);
            alert('Failed to download the data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDownload} disabled={loading || !json_data || json_data.length === 0} className='flex justify-center items-center w-16 h-full bg-white rounded-lg text-green-700'>
                {loading ? 'Downloading...' : <FaFileDownload size={30} color='green'/>}
            </button>
        </div>
    );
}

export default DownloadExcel;
