import { RegisterState } from "../store/registerSlice";

interface RegisterResponse {
  success: boolean;
  message: string;
  characterId?: string;
}

export const registerCharacter = async (data: RegisterState): Promise<RegisterResponse> => {
  const response = await fetch("http://localhost:8080/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      heroClass: data.character.heroClass,
      visuals: data.visualConfig.configString,
      email: data.credentials.email,
      nickname: data.credentials.nickname,
      password: data.credentials.password,
      heroNickname: data.credentials.heroNickname,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Registration failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = `Server error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};