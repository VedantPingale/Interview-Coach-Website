export const API_URL = "http://localhost:8000/api";

export async function transcribeAudio(file: Blob) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/transcribe`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
