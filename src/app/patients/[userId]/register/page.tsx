import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex min-h-screen h-screen">
      <section className="remove-scrollbar relative overflow-y-auto px-[5%] flex-1">
        <div className="max-w-[800px] flex flex-col size-full mx-auto py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-10 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <p className="text-regular text-dark-600 my-10">© 2024 CarePlus</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="onboarding"
        width={1000}
        height={1000}
        className="max-w-[390px] object-cover h-full hidden md:block"
      />
    </div>
  );
};

export default Register;
