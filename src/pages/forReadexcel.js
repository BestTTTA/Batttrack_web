import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/router';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

function ExcelReader() {
    const [data, setData] = useState([]);
    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);

    const router = useRouter();
    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = async (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            setData(data);

            if (data.length > 0) {
                setData(data);  // Set the full data in state
                setColumnCount(data[0].length);  // Set column count based on the first row

                // Find the index of the column named 'ลำดับ'
                const sequenceIndex = data[0].indexOf('ลำดับ');
                if (sequenceIndex !== -1) {
                    // Filter out the header row and count unique entries in the 'ลำดับ' column
                    const sequenceSet = new Set(data.slice(1).map(row => row[sequenceIndex]));
                    setRowCount(sequenceSet.size - 1);  // Set row count based on unique 'ลำดับ' entries
                } else {
                    console.error('Column "ลำดับ" not found');
                }
            } else {
                setData([]);
                setColumnCount(0);
                setRowCount(0);
            }

        };
        reader.readAsBinaryString(file);
    }
    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div className='bg-gray-900 min-h-screen p-8 space-y-8'>
            <button onClick={() => router.back()} className="absolute top-5 left-5">
                <MdOutlineArrowBackIosNew color='white' size={30} />
            </button>
            <div>
                <input
                    type="file"
                    id="custom-input"
                    onChange={handleChange}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    accept=".xlsx,.xls"
                    hidden
                />
                <label
                    htmlFor="custom-input"
                    className="relative text-white cursor-pointer w-full flex items-center justify-center border border-dashed rounded-lg h-64"
                >
                    เลือกไฟล์ +
                </label>
            </div>
            {data.length > 0 && (
                <div className='text-white'>
                    <table border="1" className='border w-full'>
                        {data.map((row, index) => (
                            <tr key={index} className='border-b text-sm'>
                                {row.map((cell, index) => (
                                    <td key={index} className='border-r'>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </table>
                </div>
            )}
            <div>Total columns: {columnCount}</div>
            <div>Total rows: {rowCount}</div>
        </div>
    );
}

export default ExcelReader;
