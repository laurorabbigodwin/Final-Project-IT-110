const Footer = () => {
  return (
    <footer className="mt-20">
      {/* Subtle shadow above footer */}
      <div className="h-px bg-purple-200/50 dark:bg-purple-900/50 shadow-sm"></div>

      {/* Footer bar with rounded bottom corners - purple theme */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 dark:from-purple-900 dark:via-purple-800 dark:to-pink-800 rounded-b-3xl py-4 px-6 shadow-lg shadow-purple-200/50 dark:shadow-purple-900/50">
        <p className="text-white text-center text-sm font-medium">
          © 2025 Inspirely | Daily Affirmation Studio | Final Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;
