import DataForm from "@/components/ipfs-form";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="min-w-[100vh] h-[100vh]">
      <Header />
      <DataForm />
    </main>
  );
}
