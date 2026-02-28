import { ErrorState } from "@/components/feedback/ErrorState";

export default function NotFoundPage() {
  return (
    <ErrorState
      actionLabel=""
      description="The page you requested does not exist or may have been removed. You can return to the homepage and continue browsing verified opportunities."
      title="This page could not be found."
    />
  );
}
