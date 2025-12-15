import { useState, useRef } from "react";
import { sendAudioToServer } from "../services/api";
import "../pages/AudioRecorder.css";
import { Mic } from 'lucide-react';

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
          if (Array.isArray(recommendations)) {
            onResult(recommendations);
          } else {
            console.error("Invalid recommendations format:", recommendations);
            onResult([]);
          }
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

  const toggleRecording = () => {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
};
   return (
    <div className="audio-recorder">
      <div
        className={`record-circle ${isRecording ? "recording" : ""}`}
        onClick={toggleRecording}
      >
        <Mic size={20} color={isRecording ? "red" : "black"} />
        {isRecording && (
          <div className="waves">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      {loading && <p className="loading-text">Listening & thinking...</p>}
    </div>
  );
}
