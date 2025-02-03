import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div className="w-screen">
      <Navbar />
      {children}
    </div>
  );
}
