import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { useEffect } from "react";
import { GlobalState } from "../../types/globalState";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/users/actions";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDispatch } from "../../store/store";

export const Profile = () => {
  const { currentUser, loading } = useSelector(
    (state: GlobalState) => state.userReducer,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

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
          <Card
            title={currentUser ? `${currentUser.name} ${currentUser.name}` : ""}
          >
            <Avatar
              label={currentUser ? currentUser.name[0] : ""}
              size="large"
              style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              shape="circle"
            />
            <p className="m-0">
              name: <strong>{currentUser && currentUser.name}</strong>
            </p>

            {currentUser?.services && currentUser.services.length > 0 ? (
              currentUser.services.map((service, index) => (
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
