import axios from "axios"
import { useState } from "react";
import { useRouter } from 'next/router';

export default function UseRegister() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    const nameChange = (event) => {
        setName(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const Register = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/register/`, {
                username: name,
                password: password
            })
            console.log("Register", response.status)
            if (response.status === 201) {
                router.push("/login")
            }
        } catch (error) {
            console.log("error Register", error)
            alert("ชื่อนี้ถูกใช้งานแล้ว")
        }
        setLoading(false)
    }
    return {
        ClickRegister: {
            Register, name, password, nameChange, passwordChange, loading
        }
    }
}
