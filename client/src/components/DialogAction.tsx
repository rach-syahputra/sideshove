import LoadingSpinner from "./LoadingSpinner";

interface DialogActionProps {
  label?: string;
}

const DialogAction = ({ label = "Doing Action..." }: DialogActionProps) => {
  return (
    <div className="w-screen h-screen z-40 fixed top-0 left-0 flex items-center justify-center">
      <div className="px-8 py-4 z-50 bg-background rounded-md shadow flex items-center gap-3 justify-center">
        <LoadingSpinner label={label} />
      </div>
      <div className="bg-gray-700 absolute top-0 left-0 w-screen h-screen opacity-20"></div>
    </div>
  );
};

export default DialogAction;
