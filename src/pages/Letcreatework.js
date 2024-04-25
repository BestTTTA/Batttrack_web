import React, { useState } from 'react'
import useCreatework from '@/hooks/creatework.hook'
import { useRouter } from 'next/router';
import ExcelReader from '@/components/ReadExcelCreate';
import axios from 'axios';

export default function Letcreatework() {

    const { createWork } = useCreatework();
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const Id_project = localStorage.getItem("id_project");
    const updateStepsFromExcel = async () => {
        const dataStepRaw = localStorage.getItem("steps");

        if (!dataStepRaw) {
            console.log("No steps data found in local storage.");
            return;
        }

        const dataStep = JSON.parse(dataStepRaw);

        if (!Array.isArray(dataStep) || dataStep.length === 0) {
            console.log("Steps data is not an array or is empty.");
            return;
        }

        for (let i = 1; i < dataStep.length; i++) {
            const stepEntry = dataStep[i];
            const stepName = Array.isArray(stepEntry) ? stepEntry[1] : stepEntry;
            try {
                console.log(`Updating step: ${stepName}`);
                const response = await axios.put(`${BASE_URL}/projects/${Id_project}/add_step`, {
                    name_step: stepName,
                    timestart: "-",
                    endtime: "-",
                    process_status: false,
                    employee: [],
                    start_break: "-",
                    end_break: "-"
                });
                console.log(`Step ${stepName} updated successfully`, response.data);
                // const responseBreakstart = await axios.put(`${BASE_URL}/projects/${Id_project}/steps/${stepName}/start_break`, {
                //     break_start: {
                //         start_break: "-"
                //     }
                // });
                // const responseBreakend = await axios.put(`${BASE_URL}/projects/${Id_project}/steps/${stepName}/end_break`, {
                //     break_end: {
                //         end_break: "-"
                //     }
                // });
            } catch (error) {
                console.error(`Update Error at step ${stepName}`, error);
            }
        }
        router.reload();
    };


    const CreateWorkandStep = async () => {
        await createWork(Id_project);
        await updateStepsFromExcel();
    }

    return (
        <div className='absolute top-50 left-50 bg-gray-900 flex w-full h-screen items-center justify-center'>
            <div className='w-64 h-fit flex justify-center items-center rounded-md flex-col gap-4 p-2 bg-gray-800 opacity-90'>
                <h1 className='text-white'>งานนี้ยังไม่ได้ถูกดำเนินการ เริ่มดำเนินการเลยหรือไม่?</h1>
                <ExcelReader />
                {/* <p className='text-white font-bold'>{Id_project ? Id_project : 'NOdata'}</p> */}
                <div className='flex w-full justify-center gap-2'>
                    <button onClick={() => CreateWorkandStep()} className='bg-white rounded-md p-2 flex justify-center items-center w-full text-orange-500 font-bold'>สร้างงานแรก</button>
                    <button onClick={() => { router.push("/select") }} className='bg-white rounded-md text-red-500 p-2 flex justify-center items-center w-full'>ยกเลิก</button>
                </div>
            </div>
        </div>
    );
}
