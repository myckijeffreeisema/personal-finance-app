const url: string = import.meta.env.VITE_API_BASE_URL;

// Autentica o usuário
export async function loginUser(email: string, password: string) {
    const response = await fetch(`${url}/auth/login`, {
        method: "post",
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify({ password, email })
    });
    const data = await response.json();
    return data;
}