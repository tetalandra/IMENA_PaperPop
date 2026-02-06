import './globals.css';

export const metadata = {
    title: 'PaperPop',
    description: 'Create beautiful event Stationary with ease.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />
            </head>
            <body className="font-sans">
                {children}
            </body>
        </html>
    );
}
