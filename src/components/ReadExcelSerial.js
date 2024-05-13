import React, { useState, useContext } from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/router';
import { AppContext } from "@/hooks/useContext";

function ReadExcelSerial() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileNameserial, setFileNameserial] = useState('');
    const { setSerials } = useContext(AppContext);
    const [rowCount, setRowCount] = useState(0);

    const handleFileserial = (file) => {
        setLoading(true);
        setFileNameserial(file.name);
        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                setSerials(JSON.stringify(data));
                setError('');
                setRowCount(data.length - 1);
            } catch (e) {
                setError('Failed to read or process file');
            }
            setLoading(false);
        };
        reader.onerror = () => {
            setError('Error reading the file');
            setLoading(false);
        };
        reader.readAsBinaryString(file);
    }

    const handleChangeserial = (e) => {
        const fileserial = e.target.files;  // Changed from `e.target.fileserial` to `e.target.files` to correctly access the file list
        if (fileserial && fileserial[0]) {
            handleFileserial(fileserial[0]);
        }
    }

    return (
        <div className='w-full h-fit'>
            {!loading ? (
                <div className='w-full h-fit'>
                    <input
                        type="file"
                        id="file-input-serial" // Consistent ID for all input instances
                        onChange={handleChangeserial}
                        accept=".xlsx,.xls"
                        hidden
                    />
                    <label
                        htmlFor="file-input-serial"
                        className="p-2 relative text-sm text-white cursor-pointer w-full flex items-center justify-center border border-dashed rounded-lg h-32"
                    >
                        {fileNameserial ? `Loaded: ${fileNameserial}` : "เลือกSerial +"}
                    </label>
                </div>
            ) : (
                <div className='w-full h-fit'>
                    <input
                        type="file"
                        id="file-input-serial"
                        onChange={handleChangeserial}
                        accept=".xlsx,.xls"
                        hidden
                    />
                    <label
                        htmlFor="file-input-serial"
                        className="relative text-white cursor-pointer w-full flex items-center justify-center border border-dashed rounded-lg h-32"
                    >
                        Loading...
                    </label>
                </div>
            )}
            <p className='text-white'>จำนวน Serials ทั้งหมด {rowCount}</p>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default ReadExcelSerial;
