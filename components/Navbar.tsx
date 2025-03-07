import Link from "next/link";
import Image from "next/image";

const navIcons = [
  { src: "/assets/icons/search.svg", alt: "Search icon" },
  { src: "/assets/icons/black-heart.svg", alt: "Heart" },
  { src: "/assets/icons/user.svg", alt: "User icon" },
];

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <nav className="flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo text-xl font-semibold text-gray-900">
            DARAZ<span className="text-primary">SCRAPER</span>
          </p>
        </Link>

        {/* Navigation Icons Section */}
        <div className="flex items-center gap-6">
          {navIcons.map((icons) => {
            return (
              <Image
                key={icons.alt}
                src={icons.src}
                alt={icons.alt}
                width={28}
                height={28}
                className="object-contain hover:opacity-80 transition-opacity"
              />
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

