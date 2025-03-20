import Navbar from "@/app/components/Navbar";
import './globals.css'; // Importiere die globale CSS-Datei
import { TodoAppStateProvider } from "./context/TodoAppContext";
import ErrorViewer from "./components/ErrorViewer";
import NameInput from "./components/NameInput"; // Neu hinzugefügt

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJNNCAxMmw0IDQgOC04IiAvPjwvc3ZnPg=="
                    type="image/svg+xml"
                />
                <title>To-Do App</title>
            </head>
            <body>
                <TodoAppStateProvider>
                    <div className="container">
                        <Navbar />
                        <NameInput /> {/* Der NameInput wird hier eingebunden */}
                        <main className="content">{children}</main>
                        <ErrorViewer />
                    </div>
                </TodoAppStateProvider>
            </body>
        </html>
    );
}
