interface UserAvatarProps {
  imageUrl?: string;
  name: string;
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "w-8 h-8 text-sm",
  medium: "w-12 h-12 text-md",
  large: "w-16 h-16 text-lg",
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  name,
  size = "small",
}) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-600 ${sizeClasses[size]} cursor-pointer`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <span className="text-white font-bold">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default UserAvatar;
