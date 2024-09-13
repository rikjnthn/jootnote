import ContentInput from "@/components/content-input";
import TitleInput from "@/components/title-input";

export default function Page() {
  return (
    <div className="flex h-full flex-col md:py-14 lg:px-20">
      <TitleInput />

      <ContentInput />
    </div>
  );
}
