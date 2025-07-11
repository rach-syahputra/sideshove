import LoadingSpinner from "./LoadingSpinner";

interface DialogActionProps {
  label?: string;
}

const DialogAction = ({ label = "Doing Action..." }: DialogActionProps) => {
  return (
    <div className="fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center">
      <div className="bg-background z-50 flex items-center justify-center gap-3 rounded-md px-8 py-4 shadow">
        <LoadingSpinner label={label} />
      </div>
      <div className="absolute top-0 left-0 h-screen w-screen bg-gray-700 opacity-20"></div>
    </div>
  );
};

export default DialogAction;
