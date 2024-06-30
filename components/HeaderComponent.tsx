import { LuCodepen } from "react-icons/lu";
import ProjectFileName from "./ProjectFileName";
import UserAvatar from "./UserAvatarComponent";

export default function HeaderComponent() {
  return (
    <div className="flex gap-2 items-center justify-between px-2 h-full">
      <LuCodepen className="h-4 w-5" />
      <ProjectFileName className="mr-auto" />
      <UserAvatar name="guest" />
    </div>
  );
}
