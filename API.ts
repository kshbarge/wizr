export async function getUsers() {
  const response = await fetch(`https://wizr-z1na.onrender.com/users`);

  if (!response.ok) {
    console.error(response.status);
  }

  const users = await response.json();
  return users;
}
