import { useState, useRef } from "react";
import { sendAudioToServer } from "../services/api";

export default function AudioRecorder({ onResult }) {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

      mediaRecorder.onstop = async () => {
        setLoading(true);
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        console.log(chunksRef);
        console.log("Audio blob:", blob);
        try{
          const recommendations = await sendAudioToServer(blob); 
          console.log("Server response:", recommendations);
         onResult(recommendations); 
          setLoading(false);
        }
       catch (error) {
          console.error("Error sending audio to server:", error);
          setLoading(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Cannot access microphone:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="audio-recorder">
      {!isRecording ? (
        <button onClick={startRecording} className="start-btn">
          🎤 Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} className="stop-btn">
          ⛔ Stop Recording
        </button>
      )}
      {loading && <p>Loading recommendations...</p>}
    </div>
  );
}
