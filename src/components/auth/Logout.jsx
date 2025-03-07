import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Logout = ({ onClose, isOpen, fromUrl = false }) => {
  const navigate = useNavigate();
  const { logout, loading } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/landing", { replace: true });
    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (fromUrl) navigate("/");
    if (onClose) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Out</DialogTitle>
          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Log Out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
