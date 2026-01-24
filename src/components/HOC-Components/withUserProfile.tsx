import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../types/globalState";
import { useEffect } from "react";
import { getOneUser } from "../../store/users/actions";
import { Profile } from "../../pages/freelance-profile";
import { MyProfile } from "../../pages/my-profile";
import { AppDispatch } from "../../store/store";

// hoc/withUserProfile.tsx
export const withUserProfile = (
  Component: React.FC<any>,
  isMyProfile: boolean = false,
  token?: string,
) => {
  return (props: any) => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector(
      (state: GlobalState) => state.userReducer,
    );

    useEffect(() => {
      if (isMyProfile) {
        // Get current user
      } else if (id) {
        dispatch(getOneUser(id));
      }
    }, [dispatch, id]);

    return <Component {...props} user={user} loading={loading} />;
  };
};

// Usage:
export const DetailsUser = withUserProfile(Profile, false);
export const MyProfileComponent = withUserProfile(MyProfile, true);
