import { useStorage } from '@vueuse/core';

export function useTheme() {
    const theme = useStorage('theme', 'dark');

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'light' : 'dark';
    }

    return {
        theme,
        toggleTheme,
    };
}