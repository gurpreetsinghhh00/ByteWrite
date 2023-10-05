import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="border-t-2 border-orange-500 w-full ">
      <div className="z-10 mx-auto px-4">
        <div className="m-6 flex flex-wrap ">
          <div className="w-full p-5 md:w-1/2 lg:w-8/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 items-center font-playball text-orange-500 text-xl">
                ByteWrite
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-5 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium hover:text-orange-400"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium hover:text-orange-400"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-5 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium hover:text-orange-400"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium hover:text-orange-400"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium hover:text-orange-400"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
