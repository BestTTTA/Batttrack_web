import React from 'react'
import { useState } from 'react';
export default function Generate() {
    const [qrCodeValue, setQrCodeValue] = useState("โปรดใส่ชื่อโปรเจค");

    const downloadQRCode = async () => {
        if (!qrCodeValue) {
            console.error("No QR Code value provided for download");
            return;
        }

        try {
            const url = await QRCodeSVG.toDataURL(qrCodeValue);
            const link = document.createElement("a");
            link.href = url;
            link.download = `QRCode-${new Date().toISOString()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating QR code for download:', error);
        }
    };

    return {
        ClickGenerate: {
            downloadQRCode, setQrCodeValue
        }
    }
}
