import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { createUserFreelancer } from "../../store/users/actions";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { GlobalState } from "../../types/globalState";

export const CreateAccount = () => {
  const { loading } = useSelector((state: GlobalState) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [laborPrice, setLaborPrice] = useState("");
  const [estimatedMaterialCost, setEstimatedMaterialCost] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    const services = [
      {
        name: serviceName,
        laborPrice: Number(laborPrice),
        estimatedMaterialCost: Number(estimatedMaterialCost),
        notes: notes,
      },
    ];

    const userDto = {
      name: name,
      email: email,
      password: password,
      services: services,
    };

    try {
      const res = await dispatch(createUserFreelancer(userDto));
      navigate(`/profile/${res.payload.id}`);
    } catch (error) {
      throw new Error("Failed to create user");
    }
  };

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
        <div>
          {/* Name */}
          <div className="mt-3">
            <InputText
              type="text"
              className="p-inputtext-lg"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mt-3">
            <InputText
              type="text"
              className="p-inputtext-lg"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mt-3">
            <InputText
              type="password"
              className="p-inputtext-lg"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <hr />

          <div className="mt-3 font-bold">Services</div>

          {/* Service Name */}
          <div className="mt-3">
            <InputText
              type="text"
              className="p-inputtext-lg"
              placeholder="Service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          {/* Labor Price */}
          <div className="mt-3">
            <InputText
              type="number"
              className="p-inputtext-lg"
              placeholder="Labor Price"
              value={laborPrice}
              onChange={(e) => setLaborPrice(e.target.value)}
            />
          </div>

          {/* Estimated Material Cost */}
          <div className="mt-3">
            <InputText
              type="number"
              className="p-inputtext-lg"
              placeholder="Estimated Material Cost"
              value={estimatedMaterialCost}
              onChange={(e) => setEstimatedMaterialCost(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="mt-3">
            <InputText
              type="text"
              className="p-inputtext-lg"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-1">
            <Button label="Send" severity="info" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};
