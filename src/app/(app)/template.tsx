import Header from "@/components/header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="hide-scrollbar relative flex h-full flex-col overflow-x-hidden md:flex">
      <Header />

      <div className="hide-scrollbar ml-auto h-full w-full md:w-2/3">
        {children}
      </div>
    </div>
  );
}
