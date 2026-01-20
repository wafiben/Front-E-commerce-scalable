import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { useEffect } from "react";
import { GlobalState } from "../../types/globalState";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../store/users/actions";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDispatch } from "../../store/store";

export const Profile = () => {
  const { id, user, loading } = useSelector(
    (state: GlobalState) => state.userReducer,
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      dispatch(getOneUser(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-content-center">
        <div className="card w-5 mt-5 text-center">
          <Card title={user ? `${user.name} ${user.name}` : ""}>
            <Avatar
              label={user ? user.name[0] : ""}
              size="large"
              style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              shape="circle"
            />
            <p className="m-0">
              name: <strong>{user && user.name}</strong>
            </p>

            {user?.services && user.services.length > 0 ? (
              user.services.map((service, index) => (
                <div className="m-0" key={index}>
                  <p>
                    Service Name: <strong>{service.name}</strong>
                  </p>
                  <p>
                    Labor Price: <strong>${service.laborPrice}</strong>
                  </p>
                  <p>
                    Estimated Material Cost:{" "}
                    <strong>${service.estimatedMaterialCost}</strong>
                  </p>
                  <p>
                    Notes: <strong>{service.notes}</strong>
                  </p>
                </div>
              ))
            ) : (
              <p>No services available</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
