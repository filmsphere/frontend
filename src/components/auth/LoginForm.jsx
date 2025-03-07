import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const lastPage = location.state?.from?.pathname || "/";

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!userIdentifier || !password) {
      useAuthStore.getState().addMessage("Please fill in all fields.", "error");
      return;
    }

    const username = userIdentifier.includes("@") ? "" : userIdentifier;
    const email = userIdentifier.includes("@") ? userIdentifier : "";

    const success = await login(username, email, password);
    if (success) {
      navigate(lastPage, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 sm:px-8 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-neutral-900 py-8 px-4 shadow rounded-lg sm:px-10">
          <form onSubmit={handleLogIn} className="space-y-6">
            {/* Email or Username Field */}
            <div>
              <Label
                htmlFor="userIdentifier"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email or Username
              </Label>
              <Input
                id="userIdentifier"
                type="text"
                placeholder="Email or Username"
                value={userIdentifier}
                onChange={(e) => setUserIdentifier(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Login Button */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <span className="mr-2">Don't have an account?</span>
            <Link
              to="/register"
              state={{ from: lastPage }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
