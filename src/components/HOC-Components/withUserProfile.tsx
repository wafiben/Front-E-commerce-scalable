// hoc/withUserProfile.tsx
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../types/globalState";
import { useEffect } from "react";
import { getOneUser, getMe } from "../../store/users/actions";
import { AppDispatch } from "../../store/store";


export const withUserProfile = (
  Component: React.FC<any>,
  isMyProfile: boolean = false,
) => {
  return (props: any) => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { user, loading, currentUser, currentUserLoading } = useSelector(
      (state: GlobalState) => state.userReducer,
    );

    useEffect(() => {
      if (isMyProfile) {
        if (!currentUser && !currentUserLoading) {
          dispatch(getMe());
        }
      } else if (id) {
        dispatch(getOneUser(id));
      }
    }, [dispatch, id, currentUser, currentUserLoading]);

    const profileUser = isMyProfile ? currentUser : user;
    const profileLoading = isMyProfile ? currentUserLoading : loading;

    return (
      <Component {...props} user={profileUser} loading={profileLoading} />
    );
  };
};
