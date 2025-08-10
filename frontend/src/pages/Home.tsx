import AudioRecorder from "../components/AudioRecorder";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Interview Coach</h1>
      <AudioRecorder />
    </div>
  );
}
