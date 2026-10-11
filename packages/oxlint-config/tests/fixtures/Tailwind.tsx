/* Fixture for the better-tailwindcss jsPlugin. Trips several `better-tailwindcss/*` rules. */

export const Duplicate = () => <div className="flex flex" />;

export const Conflicting = () => <div className="flex block" />;

export const Unknown = () => <div className="not-a-tailwind-class" />;

export const Whitespace = () => <div className="  flex  " />;

export const Order = () => <div className="p-4 flex" />;
