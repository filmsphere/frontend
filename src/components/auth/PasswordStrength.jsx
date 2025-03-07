import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculatePasswordStrength,
  getPasswordStrength,
} from "../../utils/validations";

const PasswordStrength = ({ password, setPassword, disabled }) => {
  const strength = calculatePasswordStrength(password);
  const strengthText = getPasswordStrength(strength);

  return (
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={disabled}
        aria-describedby="password-strength"
      />
      <div className="mt-2 flex space-x-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-full rounded ${i < strength ? "bg-green-500" : "bg-neutral-200 dark:bg-neutral-700"} transition-colors duration-300`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p
        id="password-strength"
        className="mt-1 text-sm text-neutral-600 dark:text-neutral-400"
      >
        {`Strength: ${strengthText}. Must be 8+ characters with uppercase, numbers, and special characters.`}
      </p>
    </div>
  );
};

export default PasswordStrength;
