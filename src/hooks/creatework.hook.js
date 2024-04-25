import axios from 'axios';
import { useRouter } from 'next/router';

export default function useCreatework() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const createWork = async (name_project) => {
        try {
            const response = await axios.post(`${BASE_URL}/create_project/`,
                {
                    _id: "string",
                    name_project: name_project,
                    timestart: "-",
                    endtime: "-",
                    process_status: false,
                    process_step: [],
                    employee: [],
                });
            localStorage.setItem("createWork", response.data)
            if (response.status === 201) {
                router.push("/process")
            }
        } catch (error) {
            console.error("Error create work", error);
        }
    };

    return { createWork }
}
