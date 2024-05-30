import useThemeStore from "../Stores/ThemeStore";

export default function Navbar() {
  const updateTheme = useThemeStore((state) => state.updateTheme);
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  function handleUpdateTheme() {
    updateTheme(!isDarkTheme);
  }
  return (
    <div>
      <button onClick={handleUpdateTheme}>Toggle Theme</button>
    </div>
  );
}
