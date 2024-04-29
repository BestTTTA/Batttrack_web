import React from 'react'
import Head from "next/head";
import Link from "next/link";
import { MdQrCodeScanner } from "react-icons/md";
import { useRouter } from 'next/router';
import { MdOutlineArrowBackIosNew } from "react-icons/md";


export default function CheckQr() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>ScanProcess</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col bg-orange-500 h-screen justify-end items-center">
            <button onClick={() => router.back()} className="absolute top-5 left-3">
                    <MdOutlineArrowBackIosNew color='white' size={30} />
                </button>
                <div className="bg-white h-[90%] rounded-t-full flex flex-center items-center justify-start p-6 flex-col w-full">
                    <MdQrCodeScanner size={200} />
                    <div className="flex flex-col lg:flex-row">
                        <Link
                            href={`/scanCheck`}
                            className=" bg-orange-500 m-4 text-4xl rounded-md px-4 py-2 text-white text-center"
                        >
                            QR Scan
                        </Link>
                        <Link
                            href={`/generate`}
                            className=" bg-white border-orange-500 border-4 text-orange-500 text-center m-4 text-4xl rounded-md px-4 py-2"
                        >
                            QR Genarate
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
