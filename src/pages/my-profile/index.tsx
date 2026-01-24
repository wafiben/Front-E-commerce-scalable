// pages/my-profile/index.tsx
import { Toast } from "primereact/toast";
import { useRef, useEffect } from "react";
import { User } from "../../types/user";
import { ProfileCard } from "../../components/HOC-Components";
import { withUserProfile } from "../../components/HOC-Components/withUserProfile";

interface MyProfileProps {
  user: User | null;
}

const MyProfileBase: React.FC<MyProfileProps> = ({ user }) => {
  const toast = useRef<Toast>(null);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user && !hasShownToast.current) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Welcome",
        life: 3000,
      });
      hasShownToast.current = true;
    }
  }, [user]);

  return (
    <>
      <Toast ref={toast} />
      <ProfileCard user={user} />
    </>
  );
};

// ✅ HOC wraps MyProfileBase and renders it with user data
export const MyProfile = withUserProfile(MyProfileBase, true);
