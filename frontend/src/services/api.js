export const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob); 
  
    const res = await fetch("http://localhost:5000/api/analyze-audio", {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    return data; 
  };

