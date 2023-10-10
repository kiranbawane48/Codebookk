export async function login(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOptions);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("This email is already registered. Please log in.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
      }
    }
    const data = await response.json();

    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }

    return data;
}

export async function register(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)
    }  
    const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("This email is not registered. Please sign up.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
      }
    }
    const data = await response.json();
    
    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }

    return data;
}

export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}
