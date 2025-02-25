//  export async function fetchQuestions() {
//   try {
//     console.log("Fetching questions...");
//     const response = await fetch("https://quiz-m-api.vercel.app/questions");

//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("✅ Fetched Questions:", data);
//     return data;
//   } catch (error) {
//     console.error("❌ Error fetching questions:", error);
//     return [];
//   }
// }
export async function fetchQuestions() {
  try {
    console.log("Fetching questions...");
    const response = await fetch("https://quiz-m-m8zwk47g0-vaishnavi-ambadkars-projects.vercel.app/questions", {
      credentials: "include", // Ensure credentials are sent if needed
    });

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
