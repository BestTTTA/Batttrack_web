import axios from 'axios';
import { useRouter } from 'next/router';
import useProjectSteps from '@/hooks/useProjectSteps.hook';

export default function useCreatework(dataSteps) {
    const { updateStepsFromExcel } = useProjectSteps();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    const createWork = async (name_project) => {
        try {
            const response = await axios.post(`${BASE_URL}/create_project/`, {
                name_project: name_project,
                timestart: "-",
                endtime: "-",
                process_status: false,
                process_step: [],
                employee: []
            });
            if (response.status === 201) {
                localStorage.setItem("createWork", JSON.stringify(response.data));
                await updateStepsFromExcel(name_project, dataSteps);  
                router.push("/process");
            } else {
                console.log('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error("Error creating work", error.response ? error.response.data : error.message);
        }
    };

    const updateSerialsFromExcel = async (Step_serial) => {
        for (let i = 1; i < Step_serial.length; i++) {  
            const stepEntry = Step_serial[i];
            const serialName = Array.isArray(stepEntry) ? stepEntry[1] : stepEntry; 
            await createWork(serialName); 
        }
        // router.reload();
    };

    return { updateSerialsFromExcel, createWork };
}
