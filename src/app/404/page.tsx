import NotFound from "@/app/not-found";
import { BRAND_NAME } from "@/content/siteContent";

export const metadata = {
  title: `Page Not Found | ${BRAND_NAME}`,
  description: "The page you are looking for does not exist.",
};

export default function Custom404Page() {
  return <NotFound />;
}
