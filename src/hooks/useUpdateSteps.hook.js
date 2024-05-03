import axios from "axios";
import moment from 'moment-timezone';
import { useState, useEffect } from "react";
import useProcess from "@/hooks/useProcess.hook";
import { useRouter } from 'next/router';

export default function useUpdateSteps() {
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const currentDateTimeThailand = moment().tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm:ss');
    const [Id, setId] = useState(null);
    const [Name, setName] = useState("");
    const { projectDetails, fetchData } = useProcess(Id);

    useEffect(() => {
        const storedId = localStorage.getItem("id_project");
        const storedName = localStorage.getItem("Name");
        setId(storedId);
        setName(storedName);
    }, []);

    useEffect(() => {
        if (Id) {
            fetchData();
        }
    }, [Id]);

    const updateStep = async (stepUrl, data) => {
        try {
            const response = await axios.put(stepUrl, data);
            // console.log(`Step updated successfully`, response.data);
        } catch (error) {
            // console.log("Update step error", error);
        }
    };

    const updateProjectStep = async (endpoint, data) => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    const stepUrl = `${BASE_URL}/projects/${Id}/${endpoint}`;
                    await updateStep(stepUrl, data(projectDetails.process_step[i].name_step));
                    return;
                }
            }
        }
    };

    const updateProjectStepStatus = () => {
        updateProjectStep("update_project_step_status", nameStep => ({
            name_step: nameStep,
            new_status: true
        }));
    };

    const updateProjectStepTimeStart = () => {
        updateProjectStep("update_project_step_timestart", nameStep => ({
            name_step: nameStep,
            new_timestart: currentDateTimeThailand
        }));
    };

    const updateProjectStepEmployee = () => {
        updateProjectStep("app_emp_project_step", nameStep => ({
            name_step: nameStep,
            employee: {
                name: Name
            }
        }));
    };

    const updateProjectStepEndTime = () => {
        updateProjectStep("update_project_step_endtime", nameStep => ({
            name_step: nameStep,
            new_endtime: currentDateTimeThailand
        }));
    };

    const pressUpdateTimestart = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/timestart`, {
                timestart: currentDateTimeThailand
            });
            // console.log("Update timestart success", response.data);
        } catch (error) {
            // console.log("pressUpdateTimestart error", error);
        }
    };

    const pressUpdateEndtime = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/end_process`, {
                endtime: currentDateTimeThailand
            });
            // console.log("Update endtime success", response.data);
        } catch (error) {
            // console.log("pressUpdateEndprocess error", error);
        }
    };

    const [CanNotEndStep, setCanNotEndStep] = useState(false);

    const updateBreak = async (endpoint, data) => {
        setCanNotEndStep(true);
        await updateProjectStep(endpoint, data);
        // router.reload();
    };

    const breakStart = async () => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    // project_name = projectDetails.process_step[i].name_step
                    const response = await axios.put(`${BASE_URL}/projects/${Id}/steps/${projectDetails.process_step[i].name_step}/start_break`, {
                        break_start: {
                            start_break: currentDateTimeThailand
                        }
                    })
                    if (response.status === 200) {
                        router.reload();
                    }
                    return;
                }
            }
        }
    };


    const breakEnd = async () => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    // project_name = projectDetails.process_step[i].name_step
                    const response = await axios.put(`${BASE_URL}/projects/${Id}/steps/${projectDetails.process_step[i].name_step}/end_break`, {
                        break_end: {
                            end_break: currentDateTimeThailand
                        }
                    })
                    if (response.status === 200) {
                        router.reload();
                    }
                    return;
                }
            }
        }
        router.reload();
    };

    return {
        pressUpdateTimestart,
        updateProjectStepTimeStart,
        updateProjectStepEmployee,
        updateProjectStepEndTime,
        updateProjectStepStatus,
        pressUpdateEndtime,
        breakStart,
        breakEnd,
        CanNotEndStep
    };
}
