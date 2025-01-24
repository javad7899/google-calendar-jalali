import { Button } from "@/components/button";
import { LuLogIn as LuLogInIcon } from "react-icons/lu";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl">
        به صفحه اصلی پروژه{" "}
        <span className="text-blue-600 font-bold">کلون گوگل کلندر</span> خوش
        آمدید
      </h1>
      <Button
        label="برو به صفحه تقویم"
        href="/events"
        customClasses="w-56"
        icon={<LuLogInIcon size={20} />}
      />
    </div>
  );
};

export default HomePage;
