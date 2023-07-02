import { useEffect, useState } from "react";

const Themes = () => {

    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute('data-theme', currentTheme);
    }, [currentTheme])

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost">
                <div className="flex">
                    <p>Theme</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                <li><button onClick={() => setCurrentTheme('light')}>Light</button></li>
                <li><button onClick={() => setCurrentTheme('dark')}>Dark</button></li>
                <li><button onClick={() => setCurrentTheme('retro')}>Retro</button></li>
                <li><button onClick={() => setCurrentTheme('black')}>Black</button></li>
                <li><button onClick={() => setCurrentTheme('luxury')}>Luxury</button></li>
                <li><button onClick={() => setCurrentTheme('autumn')}>Autumn</button></li>
                <li><button onClick={() => setCurrentTheme('dracula')}>Dracula</button></li>
                <li><button onClick={() => setCurrentTheme('business')}>Business</button></li>
                <li><button onClick={() => setCurrentTheme('valentine')}>Valentine</button></li>
            </ul>
        </div>
    );
};

export default Themes;