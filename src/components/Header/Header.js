import React from "react";
import './Header.css';
import { createTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import categories from "../../data/category";

const Header = ({ language, setLanguage, word, setWord, lightMode }) => {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: lightMode ? '#000' : '#FFF',
            },
            type: lightMode ? 'light' : 'dark',
        },
    });

    const handleLanguageChange = ({ target: { value } }) => {
        setLanguage(value);
        setWord("")
    };

    return (
        <div className='header'>
            <span className='title'>
                {
                    word ? word : 'Word Hunt'
                }
            </span>
            <div className='inputs'>
                <ThemeProvider theme={darkTheme}>
                    <TextField
                        className="search"
                        label="Search a Word"
                        value={word}
                        onChange={({ target: { value } }) => setWord(value)}
                    />

                    <TextField
                        className="select"
                        select
                        label="Language"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </ThemeProvider>
            </div>
        </div >
    );
};

export default Header;