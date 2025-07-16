export async function getUsers() {
  try {
    const response = await fetch(`https://wizr-z1na.onrender.com/users`);

    if (!response.ok) {
      console.error(response.status);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

export async function createUser(newUser: User): Promise<User> {
  try {
    const response = await fetch(
      "https://wizr-z1na.onrender.com/users/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (!response.ok) {
      console.error(response.status);
    }

    const createdUser = await response.json();
    return createdUser;
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}

export async function updateUser(
  email: string,
  updatedData: {
    username?: string;
    name?: string;
    avatar_img_url?: string;
    bio?: string;
    skills?: string[];
    learning?: string[];
  }
) {
  const response = await fetch(
    `https://wizr-z1na.onrender.com/users/${email}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    console.error("Failed to update user:", response.status);
    return null;
  }

  const updatedUser = await response.json();
  return updatedUser;
}
