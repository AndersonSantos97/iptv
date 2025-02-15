
export const login = async (username: any, password: any) => {
    const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            username: username,
            password: password,
        }),
    });

    if(!response.ok){
        throw new Error("Invalid Credentials");
    }
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data;
};

export const getUser = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/me",{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });

    if(!response.ok){
        throw new Error("Could not fetch user data");
    }

    return response.json();
};