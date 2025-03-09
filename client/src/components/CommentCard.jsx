function CommentCard({ item }) {
  const {
    comment,
    userId: { fullname },
    createdAt,
  } = item;

  return (
    <div className="flex gap-2 items-center py-6 border-b border-gray-300">
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
