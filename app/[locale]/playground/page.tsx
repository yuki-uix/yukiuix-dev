import { getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Playground from "@/components/Playground";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "playground" });
  return {
    title: `${t("heading")} · yukiuix.com`,
    description: t("subtitle"),
  };
}

export default function PlaygroundPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Playground />
      </main>
      <Footer />
    </>
  );
}
