import { Navigation } from "../../components/Navigation";
import { getDictionary } from "../../get-dictionary";

export default async function ViLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("vi");
  return (
    <>
      <Navigation lang="vi" dict={dict} />
      {children}
    </>
  );
}
