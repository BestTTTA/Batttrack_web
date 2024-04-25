import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/router';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import useCreatework from '@/hooks/creatework.hook';

function ExcelReader() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFile = (file) => {
        setLoading(true);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                localStorage.setItem("steps", JSON.stringify(data));
                setError('');
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
    
    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    }

    return (
        <div className='w-full h-fit'>
            {!loading ? (
                <div className='w-full h-fit'>
                    <input
                        type="file"
                        id="custom-input"
                        onChange={handleChange}
                        accept=".xlsx,.xls"
                        hidden
                    />
                    <label
                        htmlFor="custom-input"
                        className="p-2 relative text-sm text-white cursor-pointer w-full flex items-center justify-center border border-dashed rounded-lg h-32"
                    >
                        {fileName ? `Loaded: ${fileName}` : "เลือกTemplate +"}
                    </label>
                </div>
            ) : (
                <div className='w-full h-fit'>
                    <input
                        type="file"
                        id="custom-input"
                        onChange={handleChange}
                        accept=".xlsx,.xls"
                        hidden
                    />
                    <label
                        htmlFor="custom-input"
                        className="relative text-white cursor-pointer w-full flex items-center justify-center border border-dashed rounded-lg h-32"
                    >
                        Loading...
                    </label>
                </div>)
            }
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default ExcelReader;
