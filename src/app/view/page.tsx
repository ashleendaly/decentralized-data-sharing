import ViewUploads from "@/components/view-uploads";

const View = () => {
  return (
    <div className=" p-5 flex flex-col items-center  gap-2">
      <div className="text-3xl font-semibold">View Uploads</div>
      <ViewUploads />
    </div>
  );
};

export default View;
