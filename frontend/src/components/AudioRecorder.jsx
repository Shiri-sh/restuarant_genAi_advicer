import { useState, useRef } from "react";
import { sendAudioToServer } from "../services/api";
import "../pages/AudioRecorder.css";
import { Mic, Check, X } from "lucide-react";

export default function AudioRecorder({ onResult }) {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationRef = useRef(null);

  const BARS = 10;
  const [levels, setLevels] = useState(Array(BARS).fill(6));

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        console.log("chunksRef.current:", chunksRef.current);
        if (chunksRef.current.length === 0) return;

        setLoading(true);
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        console.log("blob:", blob);
        try {
          const recommendations = await sendAudioToServer(blob);
          if (Array.isArray(recommendations)) {
            onResult(recommendations);
          } else {
            onResult([]);
          }
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      };

      mediaRecorder.start();
      setIsRecording(true);

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.7;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyserRef.current = analyser;
      audioContextRef.current = audioContext;

      animate();
    } catch (err) {
      console.error("Cannot access microphone:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    cancelAnimationFrame(animationRef.current);
    analyserRef.current = null;
    audioContextRef.current?.close();
  };
  const cancelRecording = () => {
    chunksRef.current=[];
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    cancelAnimationFrame(animationRef.current);
    analyserRef.current = null;
    audioContextRef.current?.close();
  };

  const animate = () => {
    if (!analyserRef.current) return;

    const buffer = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(buffer);

    const chunkSize = Math.floor(buffer.length / BARS);

    const newLevels = Array.from({ length: BARS }, (_, i) => {
      const chunk = buffer.slice(i * chunkSize, (i + 1) * chunkSize);
      const avg = chunk.reduce((a, b) => a + b, 0) / chunk.length;

      //sensitivity adjustment
      return Math.min(40, avg * 1.5 + 6);
    });

    setLevels(newLevels);
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
  <div className="audio-recorder">
    {/* מיקרופון – תמיד משמאל */}
    <button
      className="mic-button"
      onClick={!isRecording ? startRecording : undefined}
      disabled={isRecording}
    >
      <Mic size={22} />
    </button>

    {/* תוכן הקלטה – מופיע מימין */}
    {isRecording && (
      <div className="record-bar">
        

        <div className="waveform">
          {levels.map((lvl, i) => (
            <div
              key={i}
              className="wave-bar"
              style={{ height: `${lvl}px` }}
            />
          ))}
        </div>
        <button className="icon-btn cancel" onClick={cancelRecording}>
          <X size={18} />
        </button>
        <button className="icon-btn confirm" onClick={stopRecording}>
          <Check size={18} />
        </button>
      </div>
    )}

    {loading && (
      <div className="loading">
        <span className="spinner" />
        <span>Listening & thinking…</span>
      </div>
    )}
  </div>
);
}
