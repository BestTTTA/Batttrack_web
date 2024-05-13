import React, { useContext, useState, useEffect } from 'react'
import useCreatework from '@/hooks/useCreatework.hook'
import { useRouter } from 'next/router';
import ExcelReader from '@/components/ReadExcelCreate';
import ReadExcelSerial from "@/components/ReadExcelSerial"
import { AppContext } from "@/hooks/useContext";

export default function Letcreatework() {
    const router = useRouter();
    const { steps, serials } = useContext(AppContext);
    const [Id_project, setIdProject] = useState("");
    const { updateSerialsFromExcel } = useCreatework(steps); // Assuming `steps` is what you intend to pass

    useEffect(() => {
        const storedId = localStorage.getItem("id_project");
        if (storedId) {
            setIdProject(storedId);
        }
    }, []);

    const handleCreateWorkAndStep = async () => {
        if (!steps || !serials) {
            // console.log("No data found in local storage.");
            return;
        }
        const dataStep = JSON.parse(steps);
        const dataSerial = JSON.parse(serials);
        if (!Array.isArray(dataStep) || dataStep.length === 0) {
            // console.log("Steps data is not an array or is empty.");
            return;
        }
        if (!Array.isArray(dataSerial) || dataSerial.length === 0) {
            // console.log("Serial data is not an array or is empty.");
            return;
        }
        await updateSerialsFromExcel(dataSerial);
    };

    return (
        <div className='fixed inset-0 bg-gray-900 flex items-center justify-center'>
            <div className='w-64 h-fit flex flex-col items-center rounded-md gap-4 p-2 bg-gray-800 opacity-90'>
                <h1 className='text-white'>1. Upload Excel template</h1>
                <ExcelReader />
                <h1 className='text-white'>2. Upload Excel serials</h1>
                <ReadExcelSerial />
                <div className='flex w-full justify-around gap-2'>
                    <button onClick={handleCreateWorkAndStep} className='w-full bg-white rounded-md p-2 text-orange-500 font-bold'>สร้าง Project</button>
                    <button onClick={() => router.push("/optionSelect")} className='w-full bg-white rounded-md text-red-500 p-2'>ยกเลิก</button>
                </div>
            </div>
        </div>
    );
}
