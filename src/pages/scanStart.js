import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import Head from "next/head";
import { IoIosQrScanner } from "react-icons/io";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

export default function ScanStart() {
  const router = useRouter();
  const [id_project, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null);

  const handleScan = (result, error) => {
    if (result) {
      setData(result.text);
      setShowModal(true);
      qrRef.current?.stop();
    }
    if (error) {
      console.info(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.reload();
  };

  const handleOK = async () => {
    router.push('/process')
    localStorage.setItem("id_project", id_project)
  };

  return (
    <>
      <Head>
        <title>QRcode Scan</title>
        <meta name="description" content="Scan QR code" />
      </Head>
      <main className="bg-orange-500 h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <button onClick={() => router.back()} className="absolute top-5 left-5">
            <MdOutlineArrowBackIosNew color='white' size={30} />
          </button>          <div className="absolute top-50 left-50 z-50">
            <IoIosQrScanner color="white" size={200} />
          </div>
          <QrReader
            className="w-screen px-2"
            onResult={handleScan}
            scanDelay={500}
            constraints={{ facingMode: "environment" }}
            ref={qrRef}
          />
          {showModal && (
            <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
              <div className="flex w-64 gap-2 justify-center flex-col bg-white rounded-md p-4">
                <p className="text-center font-bold text-xl">{id_project}</p>
                <button
                  className="bg-orange-500 h-12 text-white flex justify-center items-center rounded-md"
                  onClick={handleOK}
                >
                  ดำเนินการต่อ
                </button>
                <button
                  className="bg-gray-200 h-12 text-gray-800 rounded-md"
                  onClick={handleCloseModal}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
