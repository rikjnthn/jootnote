import Header from "@/components/header";
import { NavigationProvider } from "@/context/navigation-context";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <div className="hide-scrollbar relative flex h-full flex-col overflow-x-hidden md:flex">
        <Header />

        <div className="hide-scrollbar file-content-container ml-auto h-full">
          {children}
        </div>
      </div>
    </NavigationProvider>
  );
}
