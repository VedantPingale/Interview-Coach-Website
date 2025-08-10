import { useState, useRef } from "react";
import { transcribeAudio } from "../utils/api";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const result = await transcribeAudio(blob);
      console.log(result);
      chunks.current = [];
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="p-4">
      {recording ? (
        <button className="bg-red-500 text-white px-4 py-2" onClick={stopRecording}>
          Stop Recording
        </button>
      ) : (
        <button className="bg-green-500 text-white px-4 py-2" onClick={startRecording}>
          Start Recording
        </button>
      )}
    </div>
  );
}
