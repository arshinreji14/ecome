import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <main className="">
      <footer className="bg-white rounded-lg shadow dark:bg-transparent m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/icon/brandlogo.png"
                className=""
                alt="Art Gallery"
                width={50}
                height={50}
              />
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
              Spicera
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/home" className="hover:underline">
              Art Gallery™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
