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
            setRowCount(data.length);
            if (data.length > 0) {
                // Calculate the number of columns from the first row
                setColumnCount(data[0].length);
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
            {/* <div>Total columns: {columnCount}</div>
            <div>Total rows: {rowCount - 1}</div> */}
        </div>
    );
}

export default ExcelReader;