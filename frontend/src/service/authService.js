const API_URL = "http://localhost:3001/api/v1/user";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json(); // { body: { token } }

  // Récupérer le profil utilisateur après login
  const profileRes = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.body.token}`,
    },
  });

  if (!profileRes.ok) {
    throw new Error("Cannot fetch profile", profileRes);
  }
  const profile = await profileRes.json(); // { body: { firstName, lastName, email, etc. } }
  return {
    token: data.body.token,
    user: profile.body,
  };
}
