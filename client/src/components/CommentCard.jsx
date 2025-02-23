function CommentCard({ item }) {
  const {
    comment,
    userId: { fullname },
  } = item;

  return (
    <div className="flex gap-2 items-center px-8 py-4 border-b border-gray-300">
      <img
        src="/defaultUser.png"
        alt="profilePic"
        className="h-8 w-8 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{fullname}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;
