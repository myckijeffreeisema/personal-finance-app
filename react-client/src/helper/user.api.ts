const url: string = import.meta.env.VITE_API_BASE_URL;

// Busca as informações do usuário
export const getUserInfo = async () => {
    const token = localStorage.getItem("jwt-token");
    if (!token) {
        throw new Error("Não há token de autenticação salvo.");
    }
    const res = await fetch(`${url}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}


// Cria uma nova conta
export const createUserAccount = async (user: any) => {
    const response = await fetch(`${url}/users`, {
        method: "post",
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
}