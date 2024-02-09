import PolicyStringForm from "@/components/policy-string-form";

const Encrypt = ({ params }: { params: { dataToUpload: string } }) => {
  const dataToUpload = JSON.parse(decodeURIComponent(params.dataToUpload));
  console.log(dataToUpload);

  return (
    <div>
      <PolicyStringForm dataToUpload={dataToUpload} />
    </div>
  );
};

export default Encrypt;
