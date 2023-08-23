const generateSection = (availableDigits) => {
  const sectionLength = 4;
  let section = "";
  for (let i = 0; i < sectionLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableDigits.length);
    section += availableDigits[randomIndex];
  }
  return section;
};

export function generateToken(availableDigits) {
  const sections = [];
  for (let i = 0; i < 4; i++) {
    sections.push(generateSection(availableDigits));
  }
  return sections.join("-");
}

export async function validateToken(token) {
  try {
    const response = await fetch("http://localhost:3001/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}
