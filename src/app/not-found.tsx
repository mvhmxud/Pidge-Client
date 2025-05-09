import Image from "next/image";
import React from "react";
import notFound from "@/assets/404.png";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BackButton from "@/components/Common/BackButton";
const NotFound = () => {
  return (
    <div className="w-full h-svh flex flex-col justify-center items-center gap-2">
      <Image
        alt="not-found"
        className="invert"
        width={200}
        height={200}
        src={notFound}
      />
      <h1 className="text-xl font-bold">Sorry, We couldn't find that page </h1>
      <BackButton>
        <Button variant={"outline"} className="flex gap-2 cursor-pointer">
          <span>
            <ArrowLeft />
          </span>
          Back
        </Button>
      </BackButton>
    </div>
  );
};

export default NotFound;
