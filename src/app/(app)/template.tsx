import Header from "@/components/header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="hide-scrollbar relative flex h-full flex-col overflow-x-hidden md:flex">
      <Header />

      <div className="hide-scrollbar file-content-container ml-auto h-full">
        {children}
      </div>
    </div>
  );
}
