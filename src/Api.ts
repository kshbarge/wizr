const baseUrl = "https://wizr-backend.onrender.com"

export function getUserByEmail(email:string) {
      return fetch(`${baseUrl}/api/user/${email}`)
    .then((res) => {
        if (!res.ok) {
            return Promise.reject({status: res.status,msg: "Failed to fetch user",});
        }
        return res.json();
    })
}

export function patchUserByEmail(email: string, updateData: Partial<UserData>) {
  return fetch(`${baseUrl}/api/user/${email}`,{
    method: "PATCH",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(updateData),
})
    .then((res) => {
        if (!res.ok) {
            return Promise.reject({status: res.status,msg: "Failed to update user",});
        }
        return res.json();
    })
}
export interface UserData{
    email: string;
    avatar: string;
    fullname: string;
    username: string;
    bio: string;
}

