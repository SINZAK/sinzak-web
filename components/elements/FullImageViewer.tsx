export const FullImageViewer = ({
  imageSrc,
  onClose,
}: {
  imageSrc: string;
  onClose: () => void;
}) => {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 grid cursor-pointer place-items-center bg-black bg-opacity-75 backdrop-blur-md"
      >
        <img
          className="w-full max-w-4xl object-cover"
          src={
            imageSrc ||
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          }
        />
      </div>
    </>
  );
};
