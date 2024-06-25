import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QrcodeReader() {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } }, 
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanFailure);

    // Cleanup on unmount
    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner ", error);
      });
    };
  }, []);

  const onScanSuccess = (decodedText, decodedResult) => {
    // Redirect to the scanned URL
    window.location.href = decodedText;
    console.log(decodedResult,"decoded result");
  };

  const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning.
    console.warn(`Code scan error = ${error}`);
  };

  return (
    <div>
      <div id="reader" style={{ width: "500px" }}></div>
      <p>Ensure the QR code is well-lit and properly aligned within the scanning area.</p>
    </div>
  );
}

export default QrcodeReader;
