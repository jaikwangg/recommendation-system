import { Button } from "./button"; 
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../ThemeContext"; 

const ThemeToggle = () => {
    const { toggleTheme, isDarkMode } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme} // Change setTheme to toggleTheme
            className="fixed top-4 right-4 z-50"
        >
            {isDarkMode ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
            
        </Button>
    );
};

export default ThemeToggle;
