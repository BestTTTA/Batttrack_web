import { useRouter } from 'next/router';
import axios from 'axios';

export default function useProjectSteps() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const updateStep = async (projectId, stepName) => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${projectId}/add_step`, {
                name_step: stepName,
                timestart: "-",
                endtime: "-",
                process_status: false,
                employee: [],
                start_break: "-",
                end_break: "-"
            });
            // console.log(`Step ${stepName} updated successfully`, response.data);
        } catch (error) {
            console.error(`Update Error at step ${stepName}`, error);
        }
    };

    const updateStepsFromExcel = async (projectId, stepsData) => {
        if (typeof stepsData === 'string') {
            stepsData = JSON.parse(stepsData);
        }
    
        for (let i = 1; i < stepsData.length; i++) {
            const stepEntry = stepsData[i];
            const stepName = Array.isArray(stepEntry) ? stepEntry[1] : stepEntry;
            // console.log("Step", stepName);
            await updateStep(projectId, stepName);
        }
        // router.reload();
    };
    

    return { updateStepsFromExcel };
}
