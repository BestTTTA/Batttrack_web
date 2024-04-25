import { IoQrCode } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { useRouter } from 'next/router';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { SiMicrosoftexcel } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Select() {
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const router = useRouter();

    useEffect(() => {
        const item = localStorage.getItem('profileImage')
        const name = localStorage.getItem("Name")
        setName(name);
        setImage(item);
    }, [])

    return (
        <div className="flex justify-center gap-8 bg-gray-900 p-16 h-screen w-full">
            <button onClick={() => router.back()} className="absolute top-5 left-5">
                <MdOutlineArrowBackIosNew color='white' size={30} />
            </button>
            <button onClick={() => { router.push("/saveProfile") }} className="absolute flex items-center gap-4 top-4 right-5 rounded-full">
                <p className="text-white bg-gray-700 p-1 rounded-sm">{name}</p>
                {
                    image ? (
                        <div className="w-[45px] h-[45px] overflow-hidden flex items-center justify-center">
                            <Image src={image} height={70} width={70} alt="Profile" className="rounded-full h-full w-full" />
                        </div>) :
                        (<CgProfile color="white" size={45} />)
                }
            </button>
            <div className="flex sm:w-[600px] flex-col w-full h-full">
                <div className="flex w-full h-fit justify-center items-center flex-col flex-auto">
                    <button onClick={() => {
                        router.push("/scanStart")
                    }} className="flex p-2 justify-center items-center focus:scale-95 w-32 h-32 rounded-lg bg-gray-800 shadow-md shadow-gray-950/50 bg-gradient-to-b from-orange-500 to-yellow-300">
                        <IoQrCode color="white" size={50} />
                    </button>
                    <h1 className="text-white">เริ่มงาน</h1>
                </div>
                <div className="flex  w-full h-fit justify-center items-center flex-col flex-auto">
                    <button onClick={() => {
                        router.push("/CheckQr")
                    }} className="flex p-2 justify-center items-center focus:scale-95 w-32 h-32 rounded-lg bg-gray-800 shadow-md shadow-gray-950/50 bg-gradient-to-b from-blue-500 to-blue-300">
                        <FaListCheck color="white" size={50} />
                    </button>
                    <h1 className="text-white">ตรวจสอบงาน</h1>
                </div>
                <div className="flex  w-full h-fit justify-center items-center flex-col flex-auto">
                    <button onClick={() => {
                        router.push("/ReadExcel")
                    }} className="flex p-2 justify-center items-center focus:scale-95 w-32 h-32 rounded-lg bg-gray-800 shadow-md shadow-gray-950/50 bg-gradient-to-b from-green-500 to-cyan-300">
                        <SiMicrosoftexcel color="white" size={50} />
                    </button>
                    <h1 className="text-white">อ่านไฟล์</h1>
                </div>
            </div>
        </div>
    )
}
