import { useAppSelector } from "../../app/hooks";
import { selectCurrent } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { User as UserComponent } from "../../components/user"; // Renommé pour éviter conflit

export const Following = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  // Assurez-vous que currentUser.following est une liste d'objets User
  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map((user) => (
        <Link to={`/users/${user._id}`} key={user._id}>
          <Card>
            <CardBody className="block">
              <UserComponent
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
    <h2>You are not following anyone</h2>
  );
};
