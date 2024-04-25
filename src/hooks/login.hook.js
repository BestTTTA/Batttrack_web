import axios from "axios"
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function useLogin() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    useEffect(() => {
        const Getdata = () => {
            const localName = localStorage.getItem("Name")
            const localPassword = localStorage.getItem("Password")
            setName(localName);
            setPassword(localPassword);
        }
        Getdata();
    }, []);

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const Login = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/login/`, `grant_type=&username=${name}&password=${password}&scope=&client_id=&client_secret=`);
            console.log("login", response.status);
            if (response.status === 200) {
                router.push("/select");
                localStorage.setItem("Name", name);
                localStorage.setItem("Password", password);
            }
        } catch (error) {
            console.error("error login", error);
            console.log(name, password)
            alert("ชื่อ หรือ รหัสผ่าน ไม่ถูกต้อง")
        }
        setLoading(false);

    };


    return {
        ClickLogin: {
            Login, name, password, nameChange, passwordChange, loading
        }
    }
}