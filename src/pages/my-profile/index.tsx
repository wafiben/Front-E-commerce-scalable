import { Toast } from "primereact/toast";
import React, { useEffect, useRef } from "react";

export const MyProfile: React.FC = () => {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    toast.current?.show({
      severity: "success",
      summary: "Sucess",
      detail: "Welcome",
      life: 3000,
    });
  }, []);
  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />
      <h1>My Profile</h1>
    </div>
  );
};
