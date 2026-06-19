
//lib/api.ts

// lib/api.ts
// lib/api.ts
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(endpoint: string, options: RequestInit = {}) {
  console.log("API CALL:", endpoint);

  // 1. Tipamos explicitamente como um Record para o TypeScript aceitar chaves dinâmicas
  const headers: Record<string, string> = { 
    ...(options.headers as Record<string, string>) 
  };

  // 2. Agora o TS aceita a atribuição sem reclamar
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  options.headers = headers;
  options.credentials = "include";

  const response = await fetch(`${API_URL}${endpoint}`, options);

  const responseText = await response.text();
  
  if (!response.ok) {
    try {
      const errorJson = JSON.parse(responseText);
      throw new Error(errorJson.message || "Erro na requisição");
    } catch {
      throw new Error(responseText || `Erro ${response.status}`);
    }
  }

  return responseText ? JSON.parse(responseText) : null;
}
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function api(endpoint: string, options: RequestInit = {}) {
//   console.log("API CALL:", endpoint)

//   options.credentials = "include"

//   options.headers = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   }

//   const response = await fetch(`${API_URL}${endpoint}`, options)

//   if (!response.ok) {
//     const errorText = await response.text()
//     throw new Error(errorText || "Erro na requisição")
//   }

//   // 🔥 evita crash quando não tem JSON
//   const text = await response.text()
//   return text ? JSON.parse(text) : null
// }



// export async function api(endpoint: string, options: RequestInit = {}) {
//   console.log("API CALL:", endpoint)
// }

// export async function api(endpoint: string, options: RequestInit = {}) {
//   // Configura para o fetch enviar e aceitar os Cookies HTTPOnly automaticamente
//   options.credentials = "include"; 
  
//   options.headers = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   };

//   const response = await fetch(`${API_URL}${endpoint}`, { ...options });

//   // Se o backend disser que o cookie expirou ou não existe, manda pro login
//   if (response.status === 401) {
//     if (typeof window !== "undefined") {
//       window.location.href = "/login";
//     }
//   }

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || "Erro na requisição");
//   }

//   return response.json();
// }