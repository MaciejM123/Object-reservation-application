import { useState } from 'react';

const light = '#206e9e';
const themeObject = {
	typography: {
		fontFamily: 'Segoe UI',
	},
	value: '0',
	palette: {
		primary: { main: light },
		type: 'dark',
	},
};

export const useDarkMode = () => {
	const [theme, setTheme] = useState(themeObject);
	const {
		palette: { type },
	} = theme;

	const toggleDarkMode = (value) => {
		if (value !== theme.value) {
			const updatedTheme = {
				...theme,
				value: value,
				palette: {
					...theme.palette,
					type: type === 'light' ? 'dark' : 'light',
				},
			};
			setTheme(updatedTheme);
		}
	};
	return [theme, toggleDarkMode];
};
