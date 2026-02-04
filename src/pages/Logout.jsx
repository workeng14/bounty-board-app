import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "context/ProfileContext";
import { useAuth } from "context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { setProfile } = useProfile() || {};
  const { signOut } = useAuth();

  useEffect(() => {
    try {
      // Clear auth/session data using Auth context
      signOut();
      if (setProfile) setProfile(null);
    } finally {
      // Navigate to login with a small delay for UX
      const id = setTimeout(() => navigate("/login", { replace: true }), 300);
      return () => clearTimeout(id);
    }
  }, [navigate, setProfile, signOut]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full bg-[#F1F2F4] animate-pulse" />
      <p className="text-[16px] font-medium text-[#18191C]">Signing you out…</p>
      <p className="text-[12px] text-[#767F8C]">You will be redirected to the login page.</p>
    </div>
  );
}


