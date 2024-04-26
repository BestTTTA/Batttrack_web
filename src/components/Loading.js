import React from 'react'

export default function Loading() {
    return (
        <div className='absolute left-0 flex justify-center items-center w-full h-screen bg-gray-900 opacity-50'>
            <span className="animate-ping absolute inline-flex justify-center items-center h-12 w-12 rounded-full bg-orange-400 opacity-80">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-orange-400 opacity-90"></span>
            </span>
        </div>
    )
}
