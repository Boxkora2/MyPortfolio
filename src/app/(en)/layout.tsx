import type { Metadata } from "next";
import { Navigation } from "../../components/Navigation";
import { getDictionary } from "../../get-dictionary";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://korachoco.cv",
    languages: {
      "en": "https://korachoco.cv",
      "vi": "https://korachoco.cv/vi",
      "x-default": "https://korachoco.cv",
    },
  },
};

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
