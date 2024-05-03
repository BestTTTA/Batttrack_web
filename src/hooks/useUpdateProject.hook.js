import axios from "axios";
import moment from 'moment';
import { useState, useEffect } from "react";

export default function useUpdataproject() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const currentDateTimeThailand = moment().format('DD-MM-YYYY HH:mm:ss');
    const [Id, setId] = useState();

    useEffect(() => {
        const Getdata = () => {
            const storedId = localStorage.getItem("id_project");
            setId(storedId);
        }
        Getdata();
    }, []);

    const useStartproject = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/timestart/`, {
                timestart: currentDateTimeThailand
            })
            // console.log("useStartproject")
        } catch (error) {
            // console.log("error useStartproject", error);
        }
    }

    const useEndproject = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/end_process/`, {
                endtime: currentDateTimeThailand
            })
            // console.log("useEndproject")
        } catch (error) {
            // console.log("error useEndproject", error);
        }
    }

    const useStatusproject = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/projects/${Id}/update_status/`, {
                process_status: true
            })
            // console.log("useStatusproject")
        } catch (error) {
            // console.log("error useStatusproject", error);
        }
    }

    return {
        ClickUpdataProject: {
            useStartproject, useEndproject, useStatusproject
        }
    }
}
