import { Inter } from "next/font/google";
import "../globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import SidePanel from "../components/sidepanel/page";
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: {
//     absolute: "",
//     default : "Digital Library - CCET",
//     template : "%s | Digital Library CCET",
//   },
//   description: "Digital Library of Carmel College of Engineering and Technology",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <SidePanel />
      <div className={inter.className + " page"}>{children}</div>
    </html>
  );
}
