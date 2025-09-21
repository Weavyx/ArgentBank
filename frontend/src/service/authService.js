/**
 * Base URL for the user API
 * @constant {string}
 */
const API_URL = "http://localhost:3001/api/v1/user";

/**
 * Authenticates the user and retrieves their profile.
 * @async
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{token: string, user: Object}>} Object containing the token and user profile
 * @throws {Error} If login or profile retrieval fails
 */
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

// Fetch user profile using token
/**
 * Fetches the user profile using the authentication token.
 * @async
 * @param {string} token - User's JWT token
 * @returns {Promise<Object>} User profile object
 * @throws {Error} If profile retrieval fails
 */
export async function fetchUserProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Cannot fetch profile");
  }
  const data = await response.json(); // { body: { firstName, lastName, email, etc. } }
  return data.body;
}

// Update user profile (firstName, lastName)
/**
 * Updates the user profile (first name, last name).
 * @async
 * @param {string} token - User's JWT token
 * @param {string} firstName - New first name
 * @param {string} lastName - New last name
 * @returns {Promise<Object>} Updated user profile object
 * @throws {Error} If profile update fails
 */
export async function updateUserProfile(token, firstName, lastName) {
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });
  if (!response.ok) {
    throw new Error("Cannot update profile");
  }
  const data = await response.json(); // { body: { firstName, lastName, email, etc. } }
  return data.body;
}
