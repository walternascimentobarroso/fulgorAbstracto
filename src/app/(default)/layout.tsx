import type { Metadata } from "next";
import RootHtml from "../components/RootHtml";

export const metadata: Metadata = {
  title: "Fulgor Abstracto",
  description: "Serviços de TI, desenvolvimento de software e manutenção de servidores em Portugal.",
};

// Serves "/" (client-side language redirect)
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="pt-PT">{children}</RootHtml>;
}
