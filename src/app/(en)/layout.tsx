import { Navigation } from "../../components/Navigation";
import { getDictionary } from "../../get-dictionary";

export default async function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("en");
  return (
    <>
      <Navigation lang="en" dict={dict} />
      {children}
    </>
  );
}
