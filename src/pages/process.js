import useProcess from "@/hooks/process.hook"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RenderStepsDropdown from "@/components/Stepdropdown";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Head from "next/head";
import useUpdateSteps from "@/hooks/UpdateSteps.hook";

export default function Process() {
    const router = useRouter();
    const [Id, setId] = useState(null);
    const { projectDetails, fetchData } = useProcess(Id);
    const Step = projectDetails?.process_step
    const { pressUpdateEndtime, BreakStart, BreakEnd } = useUpdateSteps();
    const [isOkBreak, setIsokBreak] = useState(false)
    const [isOkBreakEnd, setIsokBreakEnd] = useState(false)
    const [show, setShow] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedId = localStorage.getItem("id_project");
            if (storedId) setId(storedId);
        }
    }, []);

    useEffect(() => {
        if (Id) {
            fetchData();
        }
    }, [Id]);

    useEffect(() => {
        if (Step?.length > 0 && Step?.every(product => product.process_status === true)) {
            pressUpdateEndtime();
        }
    }, [Step]);

    if (!projectDetails) {
        return (
            <div className='absolute left-0 flex justify-center items-center w-full h-screen bg-gray-900 opacity-50'>
                <span className="animate-ping absolute inline-flex justify-center items-center h-12 w-12 rounded-full bg-orange-400 opacity-80">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-orange-400 opacity-90"></span>
                </span>
            </div>
        )
    }


    const ContinueBreak = async () => {
        await BreakStart();
        setIsokBreak(false);
    }
    const SetOpenOkBreak = () => {
        setIsokBreak(true);
    }

    if (isOkBreak) {
        return (
            <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
                <div className="flex w-64 gap-2 justify-center flex-col bg-white rounded-md p-4">
                    <p className="text-center font-bold text-xl">{Id}</p>
                    <button
                        className="bg-orange-500 h-12 text-white flex justify-center items-center rounded-md"
                        onClick={ContinueBreak}
                    >
                        ดำเนินการต่อ
                    </button>
                    <button
                        className="bg-gray-200 h-12 text-gray-800 rounded-md"
                        onClick={() => { setIsokBreak(false) }}
                    // onClick={handleCloseModal}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        )
    }


    const ContinueBreakEnd = async () => {
        await BreakEnd();
        setIsokBreakEnd(false);
    }
    const SetOpenOkBreakEnd = () => {
        setIsokBreakEnd(true);
    }

    if (isOkBreakEnd) {
        return (
            <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
                <div className="flex w-64 gap-2 justify-center flex-col bg-white rounded-md p-4">
                    <p className="text-center font-bold text-xl">{Id}</p>
                    <button
                        className="bg-orange-500 h-12 text-white flex justify-center items-center rounded-md"
                        onClick={ContinueBreakEnd}
                    >
                        ดำเนินการต่อ
                    </button>
                    <button
                        className="bg-gray-200 h-12 text-gray-800 rounded-md"
                        onClick={() => { setIsokBreakEnd(false) }}
                    // onClick={handleCloseModal}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        )
    }


    function BreakButton() {
        if (projectDetails && Step && Step.length > 0) {
            for (let i = 0; i < Step.length; i++) {
                if (Step[i].start_break !== "-" && Step[i].end_break === "-") {
                    return (
                        <button onClick={SetOpenOkBreakEnd} className="bg-white rounded-lg p-2 w-full text-red-600 font-bold focus:scale-95">เริ่มงานต่อ</button>
                    );
                } else if (Step[i].start_break === "-" && Step[i].timestart !== "-") {
                    return (
                        <button onClick={SetOpenOkBreak} className="bg-white rounded-lg p-2 w-full text-red-600 font-bold focus:scale-95">พัก</button>
                    );
                }
            }
        }
        return null;
    }


    return (
        <>
            <Head>
                <title>Process</title>
                <meta name="description" content="Process status" />
            </Head>
            <div className="bg-gray-900 p-4 min-h-screen w-full flex justify-start pt-16 items-center flex-col gap-y-4">
                <button onClick={() => router.back()} className="absolute top-5 left-3">
                    <MdOutlineArrowBackIosNew color='white' size={30} />
                </button>
                <div className='bg-gray-700 p-4 rounded-lg sm:w-[500px] w-full flex-initial'>
                    <p className='text-orange-500 text-center font-bold text-[17px] my-2'>{projectDetails.name_project}</p>
                    <p className="text-white"><strong>เวลาเริ่ม:</strong> {projectDetails.timestart}</p>
                    <p className="text-white"><strong>เวลาจบ:</strong> {projectDetails.endtime}</p>
                    <p className="text-white"><strong>สถานะ:</strong> {projectDetails.process_status ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</p>
                    <h2 className='font-bold text-center m-4 text-gray-300'>ขั้นตอน</h2>
                    <RenderStepsDropdown projectDetails={projectDetails} />
                </div>
                <div className="flex flex-initial justify-center w-full gap-x-2 sm:w-[500px]">
                    {/* {projectDetails.timestart !== "-" ? <BreakButton /> : null} */}
                    {
                        Step && Step.length > 0 && (
                            Step.some(product => product.timestart !== "-" && product.endtime === "-") ?
                                (
                                    <>
                                        <button onClick={() => { router.push("/scanEndStep") }} className="bg-white rounded-lg p-2 w-full text-orange-500 font-bold focus:scale-95">แสกนจบงาน</button>
                                        <button onClick={SetOpenOkBreakEnd} className="bg-white rounded-lg p-2 w-full text-red-600 font-bold focus:scale-95">เริ่มงานต่อ</button>
                                        <button onClick={SetOpenOkBreak} className="bg-white rounded-lg p-2 w-full text-red-600 font-bold focus:scale-95">พัก</button>
                                    </>
                                ) :
                                Step.every(product => product.process_status === true) ?
                                    // null
                                    <button onClick={() => { router.push("/select") }} className="bg-white rounded-lg p-2 w-full text-red-600 font-bold focus:scale-95">กลับหน้าหลัก</button>
                                    :
                                    (
                                        <button onClick={() => { router.push("/scanCreatework") }} className="bg-white rounded-lg p-2 w-full text-orange-500 font-bold focus:scale-95">แสกนเริ่มงาน</button>
                                    )
                        )
                    }
                </div>
            </div >
        </>
    );
}
