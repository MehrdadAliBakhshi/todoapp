import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { authUser } from "@/utils/serverHelper";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Todo App",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <div className="layout_container">
          <div className="main_container">
            <div className="flex_container">
              {children}
            </div>
          </div>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
