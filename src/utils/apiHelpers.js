import useFlashMessageStore from "../stores/flashMessageStore";
import useAuthStore from "../stores/authStore";

const CSRF_COOKIE_NAME = "csrftoken";

export const getCSRFToken = () => {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CSRF_COOKIE_NAME}=`));
  const csrfValue = csrfCookie ? csrfCookie.split("=")[1] : null;

  if (csrfValue === null)
    throw new Error("CSRF token not found. Please refresh the page.");
  return csrfValue;
};

export const handleApiResponse = async (response) => {
  const data = await response.json().catch(() => ({
    success: false,
    message: `HTTP error! Status: ${response.status} (${response.url})`,
  }));

  if (response.status === 401 && data.detail === "Unauthorized") {
    useFlashMessageStore
      .getState()
      .addMessage("Session expired. Please log in again.", "error");
    useAuthStore.getState().fallbackLogout();
    throw new Error("Session expired. Please log in again.");
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After") || 60;
    const minutes = Math.ceil(retryAfter / 60);
    const errorMessage = response.url.includes("/api/auth/refill-balance")
      ? `Try again after ${minutes} minute${minutes > 1 ? "s" : ""}.`
      : "Please cooldown 🙂, try after some time.";
    useFlashMessageStore.getState().addMessage(errorMessage, "error");
    throw new Error(errorMessage);
  }

  // no flash msg here
  if (response.status === 500) {
    console.error("Internal server error:", {
      url: response.url,
      status: response.status,
      message: data.message || "Unknown server error",
    });
    throw new Error("Internal Server Error");
  }

  if (response.status === 200 && !data.success && data.message)
    throw new Error(data.message);

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed unexpectedly.");
  }

  return data; // api response full data
};

export const apiRequest = async (url, method = "GET", body = null) => {
  const csrfToken = getCSRFToken();
  if (!csrfToken) {
    throw new Error("Authentication setup failed. Please refresh the page.");
  }

  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken,
  };

  const config = {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, config);
    return await handleApiResponse(response);
  } catch (err) {
    console.error("API request failed:", { url, method, error: err.message });
    if (err.message === "HTTP error! Status") {
      useFlashMessageStore
        .getState()
        .addMessage("Couldn't connect server!", "error");
      return false;
    }
    throw err;
  }
};
