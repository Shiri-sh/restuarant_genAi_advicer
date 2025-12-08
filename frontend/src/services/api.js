export const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob); // אם בעתיד נרצה לשלוח אודיו
  
    const res = await fetch("http://localhost:5000/api/audio", {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    return data; // JSON עם רשימת מנות
  };