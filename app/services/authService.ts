import { RegisterState } from "../store/registerSlice";
import { LoginRequest } from "../types/auth/loginRequest";
import { RegisterResponse } from "../types/auth/registerResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const registerCharacter = async (data: RegisterState): Promise<RegisterResponse> => {
  const response = await fetch(apiUrl + "/api/register" , {
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

export const loginUser = async (data : LoginRequest) => {
  const response = await fetch(apiUrl + "/api/login", {
    method : "POST",
    headers : { "Content-Type": "application/json" },
    credentials : "include",
    body : JSON.stringify ({
      email : data.email,
      password : data.password
    })
  })
  if (!response.ok) {
    let errorMessage = "Login failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = `Invalid credentials or server error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  return response.text();
}