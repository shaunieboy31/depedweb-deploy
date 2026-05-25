import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/utils";

export default function Footer() {
  const watermarkLeft = "6rem";

  return (
    <footer className="w-full">
      {/* Main footer band with faded watermark on the left */}

      <div
        className="bg-[#ECEFF1] bg-no-repeat"
        style={{
          backgroundImage: "url('/images/logo/govph-seal-mono-footer.webp')",
          backgroundSize: "160px",
          backgroundPosition: `${watermarkLeft} center`,
        }}
      >
        <div className="max-w-7xl mx-auto px-35 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 flex-grow">
            {/* Column 1 */}
            <div>
              <h3
                className={cn("text-xs font-bold uppercase mb-2 text-gray-500")}
              >
                Republic of the Philippines
              </h3>
              <p className="text-xs text-gray-700">
                All content is in the public domain unless otherwise stated.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h3
                className={cn("text-xs text-gray-600 font-bold uppercase mb-2")}
              >
                About GOVPH
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Learn more about the Philippine government, its structure, how
                government works and the people behind it.
              </p>
              <ul className="space-y-1 text-xs">
                <li>
                  <a
                    href="https://www.gov.ph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline"
                  >
                    GOV.PH
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Open Data Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Official Gazette
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3
                className={cn("text-xs font-bold uppercase mb-2 text-gray-500")}
              >
                Government Links
              </h3>
              <ul className="space-y-1 text-xs">
                <li><a href="#" className="text-gray-600 hover:underline">Office of the President</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Office of the Vice President</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Senate of the Philippines</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">House of Representatives</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Supreme Court</a></li>
              </ul>
            </div>
          </div>


          <Separator className="mt-8" />
        </div>
      </div>
    </footer>
  );
}
