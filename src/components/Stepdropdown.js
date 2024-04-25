import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const RenderStepsDropdown = ({ projectDetails }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleDropdown = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        projectDetails?.process_step.map((step, index) => (
            <div key={index} className="dropdown">
                <button className="dropdown-btn text-white text-[12px] font-bold flex justify-between w-full my-2 border-b" onClick={() => toggleDropdown(index)}>
                    {step.name_step}
                    <span >{activeIndex === index ?
                        <RiArrowDropUpLine size={20} />
                        :
                        <RiArrowDropDownLine size={20} />}</span>
                </button>
                {activeIndex === index && (
                    <div className="dropdown-content bg-gray-700 h-full p-1">
                        <p className='text-sm text-white'>เวลาเริ่ม: {step.timestart || "-"}</p>
                        <p className='text-sm text-white'>เวลาจบ: {step.endtime || "-"}</p>
                        <p className='text-sm text-white'>สถานะ: {step.process_status ? 'ดำเนินการเสร็จสิ้น' : 'ยังไม่เสร็จ'}</p>
                        <p className='text-sm text-white'>
                            พนักงานที่ทำ: {step.employee.length > 0 ? step.employee.map(emp => emp.name).join(', ') : "ยังไม่มีพนักงาน"}
                        </p>
                        <p className='text-[11px] font-bold text-white mt-2'>เริ่มพัก: {step.start_break}</p>
                        <p className='text-[11px] font-bold text-white'>ดำเนินการต่อ: {step.end_break}</p>
                    </div>
                )}
            </div>
        ))
    );
};

export default RenderStepsDropdown;