import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";

function ProfileImagePicker() {
    const [image, setImage] = useState(null);
    const [full, setFull] = useState(false)
    const [rename, setRename] = useState("")
    const router = useRouter();

    const [usedSpace, setUsedSpace] = useState(getUsedLocalStorageSpace());
    const [remainingSpace, setRemainingSpace] = useState(getRemainingLocalStorageSpace());

    function getUsedLocalStorageSpace() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                let value = localStorage.getItem(key);
                total += (value.length * 2) / 1024 / 1024;
            }
        }
        return total.toFixed(2);
    }


    function getRemainingLocalStorageSpace() {
        const maxCapacity = 5;
        const usedSpace = getUsedLocalStorageSpace();
        return (maxCapacity - usedSpace).toFixed(2);
    }


    const updateStorageInfo = () => {
        setUsedSpace(getUsedLocalStorageSpace());
        setRemainingSpace(getRemainingLocalStorageSpace());
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveImageToLocalStorage = () => {
        try {
            if (image) {
                localStorage.setItem('profileImage', image);
                router.push("/select");
            } else {
                alert('กรุณาเลือกรูปภาพก่อน');
            }
        } catch (e) {
            if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                setFull(true)
                alert('พื้นที่เก็บรูปไม่เพียงพอโปรดล้างแคชก่อนที่จะดำเนินการอีกครั้ง');
            } else {
                console.error('An error occurred while saving the image:', e);
            }
        }
    };

    const saveNewname = () => {
        localStorage.setItem("Name", rename)
    }

    const saveImageName = async () => {
        await saveImageToLocalStorage();
        // await saveNewname();
    }

    const clearLocalStorage = () => {
        localStorage.clear();
        alert('ข้อมูลทั้งหมดถูกล้างแล้ว');
        setImage(null);
        setFull(false)
    };

    useEffect(() => {
        const item = localStorage.getItem('profileImage')
        setImage(item);
    }, [])

    return (
        <div className='bg-gray-900 h-screen w-full flex justify-start items-center flex-col p-8 pt-16'>
            <div className='w-[180px] flex flex-col justify-center'>
                <button onClick={() => router.back()} className="absolute top-5 left-5">
                    <MdOutlineArrowBackIosNew color='white' size={30} />
                </button>
                <div>
                    <input
                        type="file"
                        id="custom-input"
                        onChange={handleImageChange}
                        hidden
                    />
                    <label
                        htmlFor="custom-input"
                        className="relative cursor-pointer w-full h-full flex items-center justify-center "
                    >
                        <FaCirclePlus className='absolute bottom-0 right-5' color='orange' size={30} />
                        {image ? (
                            <img src={image} alt="Profile Preview" className='rounded-full w-32 h-32' />
                        ) : (
                            <BiImageAdd color='white' size={70} />
                        )}
                    </label>
                </div>
                {/* <label className="block text-sm font-medium  text-white">แก้ไขชื่อ</label> */}
                {/* <input onChange={(e) => { setRename(e.target.value) }} value={rename} type="text" className="my-2 text-sm w-full p-1 bg-transparent text-white text-center" placeholder="แก้ไขชื่อ✎" /> */}
                <button className='bg-orange-500 rounded-md my-2 p-2 text-white font-bold' onClick={saveImageName}>บันทึกการเปลี่ยนแปลง</button>
            </div>

            {full ? (
                <div className='absolute w-64 h-80 flex justify-center items-center bg-gray-800 shadow-lg rounded-md '>
                    <div className='px-2'>
                        <p className='text-white text-sm'>ใช้พื้นที่ไปแล้ว: {usedSpace} MB</p>
                        <p className='text-white text-sm'>พื้นที่คงเหลือ: {remainingSpace} MB</p>
                        <button className='absolute bottom-0 right-0 bg-green-500 m-6 rounded-md p-2 text-white font-bold' onClick={clearLocalStorage}>เพิ่มพื้นที่</button>
                    </div>
                    <button className='absolute bottom-0 right-20 underline m-6 rounded-md p-2 text-white font-bold' onClick={() => { setFull(false) }}>cancle</button>
                    <button onClick={updateStorageInfo}><IoIosRefresh size={30} color='white' /></button>
                </div>
            ) : (null)}
        </div>
    );
}

export default ProfileImagePicker;
