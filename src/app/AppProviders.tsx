import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "src/shared/components/Toast";

const queryClient = new QueryClient();

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast />
    </QueryClientProvider>
  );
}
