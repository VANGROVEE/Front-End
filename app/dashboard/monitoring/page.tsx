import OperationsPage from "@/modules/operations";
import { LandFormProvider } from "@/modules/operations/context/land-context";

export default function OperationsApp() {
  return (
    <LandFormProvider>
      <OperationsPage />
    </LandFormProvider>
  );
}
