import UploadForm from "@/components/upload-form";
import { createClient } from "@/lib/supabase";

const Upload = async () => {
  const client = createClient();
  const { data } = await client
    .from("keys")
    .select("type,key")
    .eq("type", "pk");
  if (!data) return;
  const pk = data[0]["key"];

  return (
    <div className="grid place-items-center h-[95vh]">
      <UploadForm pk={pk} />
    </div>
  );
};

export default Upload;
