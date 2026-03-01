export const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ZAYX-OS. The future of shopping is on-chain.
        </p>
      </div>
    </footer>
  );
};
