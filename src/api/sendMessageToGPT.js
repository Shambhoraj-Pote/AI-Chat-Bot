// sendMessageToGPT.js

const API_KEY = "your_own_token_here"; // add your working Hugging Face token

export const sendMessageToGPT = async (message) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `### Instruction:\n${message}\n\n### Response:`,
        }),
      }
    );

    const data = await response.json();

    if (Array.isArray(data) && data[0]?.generated_text) {
      const fullResponse = data[0].generated_text;
      const reply = fullResponse
        .replace(`### Instruction:\n${message}\n\n### Response:`, "")
        .trim();

      return reply || "Sorry, I couldn't get a response.";
    }

    if (data?.error) {
      return `Model error: ${data.error}`;
    }

    return "Sorry, I couldn't get a response.";
  } catch (error) {
    console.error("Fetch failed:", error);
    return "Network error. Please check your internet connection.";
  }
};
