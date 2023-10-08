import { ThemeProvider } from "styled-components";
import { Menu } from "@/components/Menu";
import { Toolbox } from "@/components/Toolbox";
import { theme } from "@/constants";

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <Menu />
            <Toolbox />
        </ThemeProvider>
    );
}
