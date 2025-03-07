import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PasswordStrength from "./PasswordStrength";
import useAuthStore from "../../stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  isEmailValid,
  isUsernameValid,
  isPasswordValid,
} from "../../utils/validations";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [resendTime, setResendTime] = useState(0);
  const {
    loading,
    loadingOtp,
    checkUsername,
    requestOtp,
    register,
    addMessage,
  } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const lastPage = location.state?.from?.pathname || "/";

  useEffect(() => {
    const check = async () => {
      if (!formData.username || !isUsernameValid(formData.username)) {
        setUsernameAvailable(null);
        return;
      }
      const available = await checkUsername(formData.username);
      setUsernameAvailable(available);
    };
    const timeout = setTimeout(check, 500);
    return () => clearTimeout(timeout);
  }, [formData.username, checkUsername]);

  useEffect(() => {
    let timer;
    if (resendTime > 0) {
      timer = setInterval(() => setResendTime((prev) => prev - 1), 1000);
    } else {
      setCanResendOtp(true);
    }
    return () => clearInterval(timer);
  }, [resendTime]);

  const handleRequestOtp = async () => {
    if (!isEmailValid(formData.email)) {
      addMessage("Please enter a valid email address.", "error");
      return;
    }
    const success = await requestOtp(formData.email);
    if (success) {
      setOtpSent(true);
      setCanResendOtp(false);
      setResendTime(60);
    } else {
      setOtpSent(false);
    }
  };

  const validateForm = () => {
    const { fullname, username, email, password, confirmPassword, otp } =
      formData;
    if (!fullname || !username || !email || !password || !confirmPassword) {
      addMessage("All fields are required.", "error");
      return false;
    }
    if (!isUsernameValid(username)) {
      addMessage("Username must be 3-20 alphanumeric characters.", "error");
      return false;
    }
    if (usernameAvailable === false) {
      addMessage("Username is unavailable.", "error");
      return false;
    }
    if (!isEmailValid(email)) {
      addMessage("Please enter a valid email address.", "error");
      return false;
    }
    if (!isPasswordValid(password)) {
      addMessage(
        "Password must be 8+ characters with uppercase, numbers, and special characters.",
        "error",
      );
      return false;
    }
    if (password !== confirmPassword) {
      addMessage("Passwords do not match.", "error");
      return false;
    }
    if (!otpSent || otp.length !== 6) {
      addMessage("Please complete OTP verification.", "error");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await register(formData, navigate, lastPage);
  };

  const handleEditEmail = () => {
    setOtpSent(false);
    setResendTime(0);
    setCanResendOtp(true);
    setFormData({ ...formData, email: "", otp: "" });
  };

  const cssLabel =
    "block text-sm font-medium";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 sm:px-8 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-8">
          Create your FilmSphere account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-neutral-900 py-8 px-4 shadow rounded-lg sm:px-10">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="fullname" className={cssLabel}>
                Full Name
              </Label>
              <Input
                id="fullname"
                type="text"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="username" className={cssLabel}>
                Username
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    const sanitized = e.target.value.replace(
                      /[^a-zA-Z0-9_]/g,
                      "",
                    );
                    setFormData({ ...formData, username: sanitized });
                  }}
                  disabled={loading}
                  required
                />
                {usernameAvailable !== null && (
                  <span
                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm ${usernameAvailable ? "text-green-500" : "text-red-500"}`}
                  >
                    {usernameAvailable ? "✓ Available" : "✗ Taken"}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className={cssLabel}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading || otpSent}
                required
              />
              {!otpSent ? (
                <Button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={loadingOtp || !formData.email}
                  className="w-full"
                >
                  {loadingOtp ? "Sending OTP..." : "Send Verification OTP"}
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEditEmail}
                    className="flex-1"
                  >
                    Edit Email
                  </Button>
                  <Button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={!canResendOtp || loadingOtp}
                    className="flex-1"
                  >
                    Resend OTP {resendTime > 0 && `(${resendTime}s)`}
                  </Button>
                </div>
              )}
            </div>
            {otpSent && (
              <div className="flex justify-center">
                <InputOTP
                  value={formData.otp}
                  onChange={(otp) => setFormData({ ...formData, otp })}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
            <PasswordStrength
              password={formData.password}
              setPassword={(password) => setFormData({ ...formData, password })}
              disabled={loading}
            />
            <div>
              <Label htmlFor="confirmPassword" className={cssLabel}>
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <span className="mr-2">Already have an account?</span>
            <Link
              to="/login"
              state={{ from: lastPage }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
