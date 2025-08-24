import { Toaster } from "sonner";
import AuthProvider from "./providers/AuthProvider";
import { RoutesProvider } from "./providers/RoutesProvider";

function App() {
	return (
		<AuthProvider>
			<RoutesProvider />
			<Toaster />
		</AuthProvider>
	);
}

export default App;
