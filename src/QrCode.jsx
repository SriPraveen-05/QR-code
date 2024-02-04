import { useState } from "react"

export const QrCode = () => {
   const [img, setImg]= useState("")
   const [loading,setLoading]=useState(false)
    const [qrData,setQrData]=useState("https://github.com/SriPraveen-05");
    const [qrSize,setQrSize]=useState("150")
    async function generateQR(){
    setLoading(true)
    try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
        setImg(url)
    }catch(error){
        console.error("error generating QR code",error)
    }finally{
        setLoading(false)
    }
   }
   function downloadQR(){
    fetch(img)
       .then((response)=>response.blob())
       .then((blob)=>{
        const link =document.createElement("a")
        link.href=URL.createObjectURL(blob)
        link.download="qr.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
       })
       .catch((error)=>{
        console.error("error downloading qr code ",error)
       })
        
       
   }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please Wait..</p>}
         {img && <img src={img} className="qr-code-img" /> }
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for QR code:
            </label>
            <input type="text" id="dataInput" value={qrData} placeholder="data for qr code" onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeInput"  className="input-label">
                Image size (e.g.,100):
            </label>
            <input type="text" id="sizeInput" value={qrSize} placeholder="enter image size" onChange={(e)=>setQrSize(e.target.value)}/>
            <button className="generate-button" disabled={loading}  onClick={generateQR}>Generate QR code</button>
            <button className="download-button" onClick={downloadQR}>Download QR code</button>
        </div>
        <p className="footer">Designed by praveen</p>
    </div>
  )
}
