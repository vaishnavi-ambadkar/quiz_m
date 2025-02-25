export async function fetchQuestions() {
  try {
    console.log("Fetching questions...");
    const response = await fetch("http://localhost:5000/questions");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Fetched Questions:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    return [];
  }
}
