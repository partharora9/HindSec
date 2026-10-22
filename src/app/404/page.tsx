import NotFound from "@/app/not-found";

export const metadata = {
  title: "Page Not Found | Securio",
  description: "The page you are looking for does not exist.",
};

export default function Custom404Page() {
  return <NotFound />;
}
