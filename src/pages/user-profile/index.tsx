import { Button, Card, Image, useDisclosure } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetUser, selectCurrent } from "../../features/user/userSlice";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi";
import { useEffect } from "react";
import { GoBack } from "../../components/go-back";
import { BASE_URL } from "../../constants";
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { ProfileInfo } from "../../components/profile-info";
import { formatToClientDate } from "../../utils/formatToClientDate";
import { CountInfo } from "../../components/count-info";

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUser = useAppSelector(selectCurrent); 
  // console.log("Current User from Redux Store:", currentUser);  // Vérifiez les données de l'utilisateur actuel

  const { data } = useGetUserByIdQuery(id ?? "");
  // console.log("User Data from Query:", data);  // Vérifiez les données de l'utilisateur récupérées par le hook

  const [followUser] = useFollowUserMutation();
  const [unfolowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(resetUser());
  }, []);

  if (!data) {
    return null;
  };

  const handleFollow = async () => {
    try {
      if (id) {
        if (data?.isFollowing) {
          const response = await unfolowUser(id).unwrap();
          console.log("Unfollow Response:", response);  // Vérifiez la réponse ici
        } else {
          const response = await followUser({ followingId: id }).unwrap();
          console.log("Follow Response:", response);  // Vérifiez la réponse ici
        }

        // Recharger l'utilisateur actuel et la liste des utilisateurs
        const updatedUser = await triggerGetUserByIdQuery(id).unwrap();
        console.log("Updated User Data:", updatedUser);  // Vérifiez les données de l'utilisateur mises à jour

        const currentUserData = await triggerCurrentQuery().unwrap();
        console.log("Current User Data:", currentUserData);  // Vérifiez les données de l'utilisateur actuel mises à jour
      }
    } catch (error) {
      console.log("Error in handleFollow:", error);  // Vérifiez les erreurs ici
    }
  };


  return (
    <>
      <GoBack />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {
              currentUser?._id !== id ? (
                <Button
                  onClick={handleFollow}
                  color={data?.isFollowing ? "default" : "primary"}
                  variant="flat"
                  className="gap-2"
                  endContent={data?.isFollowing ?
                    (<MdOutlinePersonAddDisabled />) :
                    (<MdOutlinePersonAddAlt1 />)}
                >
                  {data?.isFollowing ? 'Unfollow' : 'Follow'}
                </Button>) : (
                <Button endContent={<CiEdit />} onClick={() => onOpen()}>Edit</Button>
              )
            }
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Email:" info={data.email} />
          <ProfileInfo title="Location:" info={data.location} />
          <ProfileInfo title="Date of birth:" info={formatToClientDate(data.dateOfBirth)} />
          <ProfileInfo title="About:" info={data.bio} />
          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Followers" />
            <CountInfo count={data.following.length} title="Following" />
          </div>
        </Card>
      </div>
    </>
  );
};
