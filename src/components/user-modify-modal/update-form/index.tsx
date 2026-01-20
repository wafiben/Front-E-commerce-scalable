import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../types/user";
import { GlobalState } from "../../../types/globalState";
import { ProgressSpinner } from "primereact/progressspinner";
import { modifySingleUser } from "../../../store/users/actions";

export const UpdateUser = ({
  user,
  handleClose,
}: {
  user: User;
  handleClose: any;
}) => {
  const { loading } = useSelector((state: GlobalState) => state.userReducer);

  const dispatch = useDispatch();

  const [value, setValue] = useState(user.gender);
  const [items, setItems] = useState<string[]>([]);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [city, setCity] = useState(user.city);

  const search = (event: any) => {
    let items = ["Male", "Female"];
    setItems(items);
  };

  const handleSubmit = async () => {
    const userData = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      gender: value,
      age: age,
      city: city,
    };
    await dispatch(modifySingleUser(userData));
    handleClose();
  };

  if (loading) {
    return (
      <div className="flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-3">
        <InputText
          type="text"
          className="p-inputtext-lg"
          placeholder="firts name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <InputText
          type="text"
          className="p-inputtext-lg"
          placeholder="last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <InputText
          type="number"
          className="p-inputtext-lg"
          placeholder="age"
          value={String(age)}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>
      <div className="mt-3">
        <InputText
          type="text"
          className="p-inputtext-lg"
          placeholder="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </div>
      <div className="mt-3">
        <AutoComplete
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => setValue(e.value)}
          dropdown
        />
      </div>
      <div className="mt-1">
        <Button label="Send" severity="info" onClick={handleSubmit} />
      </div>
    </div>
  );
};
