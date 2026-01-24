// components/ProfileCard/index.tsx
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { User } from "../../types/user";

interface ProfileCardProps {
  user: User | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="flex justify-content-center">
      <div className="card w-5 mt-5 text-center">
        <Card title={user ? `${user.name} ${user.name}` : ""}>
          <Avatar
            label={user ? user.name[0].toUpperCase() : ""}
            size="large"
            style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
            shape="circle"
          />
          <p className="m-0">
            Name: <strong>{user?.name}</strong>
          </p>
          <p className="m-0">
            Username: <strong>{user?.username}</strong>
          </p>
          <p className="m-0">
            Email: <strong>{user?.email}</strong>
          </p>
        </Card>
      </div>
    </div>
  );
};