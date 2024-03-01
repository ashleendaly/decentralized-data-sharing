import DataForm from "@/components/ipfs-form";
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
    <div className="p-2">
      <DataForm pk={pk} />
    </div>
  );
};

export default Upload;
