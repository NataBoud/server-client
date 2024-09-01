import { selectCurrent } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { User } from "../../components/user"; 
import { useAppSelector } from "../../app/hooks";

export const Followers = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map((user) => (
        <Link to={`/users/${user._id}`} key={user._id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.name ?? ""}
                avatarUrl={user.avatarUrl ?? ""}
                description={user.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>You have no followers</h2>
  );
};
