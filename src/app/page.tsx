import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";
  return (
    <div className="flex min-h-screen h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar relative overflow-y-auto px-[5%] flex-1 my-auto">
        <div className="max-w-[496px] flex flex-col size-full mx-auto py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-10 h-10 w-fit"
          />
          <PatientForm />

          <div className="mt-20 flex justify-between font-normal text-[14px] leading-[18px]">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePlus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="onboarding"
        width={1000}
        height={1000}
        className="max-w-[50%] object-cover h-full hidden md:block"
      />
    </div>
  );
}
