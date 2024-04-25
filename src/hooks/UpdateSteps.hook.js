import axios from "axios";
import moment from 'moment-timezone';
import { useState, useEffect } from "react";
import useProcess from "@/hooks/process.hook";
import { useRouter } from 'next/router';

export default function useUpdateSteps() {
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const currentDateTimeThailand = moment().tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm:ss');
    const [Id, setId] = useState(null);
    const [Name, setName] = useState("")
    const { projectDetails, fetchData } = useProcess(Id);

    useEffect(() => {
        const storedId = localStorage.getItem("id_project");
        const Name_emp = localStorage.getItem("Name");
        setId(storedId);
        setName(Name_emp);
    }, []);

    useEffect(() => {
        if (Id) {
            fetchData();
        }
    }, [Id]);

    const UpdatestepstatusEnd = async () => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    try {
                        const response = await axios.put(`${BASE_URL}/projects/${Id}/update_project_step_status`, {
                            name_step: projectDetails.process_step[i].name_step,
                            new_status: true
                        });
                        console.log(`Step ${projectDetails.process_step[i].name_step} updated successfully`, response.data);
                        break;
                    } catch (error) {
                        console.log("Update step error", error);
                    }
                    return;
                }
            }
        }
    };


    const Updatestepstarttime = async () => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    try {
                        const response = await axios.put(`${BASE_URL}/projects/${Id}/update_project_step_timestart`, {
                            name_step: projectDetails.process_step[i].name_step,
                            new_timestart: currentDateTimeThailand
                        });
                        console.log(`Step ${projectDetails.process_step[i].name_step} updated successfully`, response.data);
                        // if(response.status === 200){
                        //     router.reload();
                        // }
                        break;
                    } catch (error) {
                        console.log("Update step error", error);
                    }
                    return;
                }
            }
        }
        // router.reload();
    };

    const Updatestepemployee = async () => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    try {
                        const response = await axios.put(`${BASE_URL}/projects/${Id}/app_emp_project_step`, {
                            name_step: projectDetails.process_step[i].name_step,
                            employee: {
                                name: Name
                            }
                        });
                        console.log(`Step ${projectDetails.process_step[i].name_step} updated successfully`, response.data);
                        break;
                    } catch (error) {
                        console.log("Update Employee error", error);
                    }
                    return;
                }
            }
        }
    };



    const Updatestependtime = async () => {
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    try {
                        const response = await axios.put(`${BASE_URL}/projects/${Id}/update_project_step_endtime`, {
                            name_step: projectDetails.process_step[i].name_step,
                            new_endtime: currentDateTimeThailand
                        });
                        console.log(`Step End ${projectDetails.process_step[i].name_step} updated successfully`, response.data);
                        // if(response.status === 200){
                        //     router.reload();
                        // }
                        break;
                    } catch (error) {
                        console.log("Update step error", error);
                    }
                    return;
                }
            }
        }
        // router.reload();
    };


    const pressUpdateTimestart = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/timestart`, {
                timestart: currentDateTimeThailand
            })
            if (response.status === 200) {
                console.log("update timestart success")
            }
        } catch (error) {
            console.log("pressUpdateTimestart error", error)
        }
    }


    const pressUpdateEndtime = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/end_process`, {
                endtime: currentDateTimeThailand
            });
            if (response.status === 200) {
                console.log("Update endtime success");
            }
        } catch (error) {
            console.log("pressUpdateEndprocess error", error);
        }
    };


    const [CanNotEndStep, setCanNotEndSte] = useState(false);
    const BreakStart = async () => {
        setCanNotEndSte(true)
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    try {
                        const response = await axios.put(`${BASE_URL}/projects/${Id}/steps/${projectDetails.process_step[i].name_step}/start_break`, {
                            break_start: {
                                start_break: currentDateTimeThailand
                            }
                        });
                        console.log(`Step ${projectDetails.process_step[i].name_step} updated successfully`, response.data);
                        break;
                    } catch (error) {
                        console.log("Update step error", error);
                    }
                    return;
                }
            }
        }
        router.reload();
    };

    const BreakEnd = async () => {
        setCanNotEndSte(false)
        if (projectDetails && projectDetails.process_step && projectDetails.process_step.length > 0) {
            for (let i = 0; i < projectDetails.process_step.length; i++) {
                if (!projectDetails.process_step[i].process_status) {
                    try {
                        const response = await axios.put(`${BASE_URL}/projects/${Id}/steps/${projectDetails.process_step[i].name_step}/end_break`, {
                            break_end: {
                                end_break: currentDateTimeThailand
                            }
                        });
                        console.log(`Step ${projectDetails.process_step[i].name_step} updated successfully`, response.data);
                        break;
                    } catch (error) {
                        console.log("Update step error", error);
                    }
                    router.reload();
                    return;
                }
            }
        }
        router.reload();
    };




    return { pressUpdateTimestart, Updatestepstarttime, Updatestepemployee, Updatestependtime, UpdatestepstatusEnd, pressUpdateEndtime, BreakStart, BreakEnd, CanNotEndStep };
}
