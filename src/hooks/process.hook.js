import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function useProcess(Id) {
    const [projectDetails, setProjectDetails] = useState(null);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    
    const fetchData = async () => {
        try {
            const url = `${BASE_URL}/search_project_name/${encodeURIComponent(Id)}`;
            const response = await axios.get(url);
            setProjectDetails(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
            console.log("seterror true")
            setProjectDetails(null);
            router.push("/Letcreatework")
        }
    };

    return { projectDetails, fetchData }
}
