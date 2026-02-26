import type { Metadata } from "next";
import { Navigation } from "../../components/Navigation";
import { getDictionary } from "../../get-dictionary";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://korachoco.cv/vi",
    languages: {
      "en": "https://korachoco.cv",
      "vi": "https://korachoco.cv/vi",
    },
  },
};

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
