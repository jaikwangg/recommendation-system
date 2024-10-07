import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { Button } from "./components/button";
import Sidebar from './components/Sidebar'; // Your sidebar component
import Home from './pages/Home'; // Your Home component
import Recommendation from './pages/Recommendation'; // Your Recommendation component
import ProductDetail from './pages/ProductDetail'; // import ProductDetail
import MobileMenu from "./components/MobileMenu";

// App.jsx (หรือ App.js)



const queryClient = new QueryClient();

// const ThemeToggle = () => {
//   const { setTheme, theme } = useTheme();

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="fixed top-4 right-4 z-50"
//     >
//       <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   );
// };

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50"
        >
          Back to Top
        </Button>
      )}
    </>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div>
              {/* <Button
                className="lg:hidden fixed top-4 left-4 z-50"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MenuIcon className="h-6 w-6" />
              </Button> */}
              {/* <MobileMenu /> */}
              <main >
                {/* <div className="mb-16">
                  <ThemeToggle />
                </div> */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Recommendation" element={<Recommendation />} />
                  <Route path="/" element={<Sidebar />} />
                  <Route path="/Recommendation" element={<Recommendation />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/" element={<ProductDetail />} />
                  <Route path="/product/:imageId" element={<ProductDetail />} />

                  <Route path="/" element={<Recommendation />} />
                  <Route path="/image-details/:imageId" element={<ProductDetail />} /> {/* เส้นทางที่ใช้ imageId */}
                </Routes>
              </main>
            </div>
            {/* <ScrollToTopButton /> */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
