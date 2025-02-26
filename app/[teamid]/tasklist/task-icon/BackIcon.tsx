interface BackIconProps {
  className?: string;
}

export default function BackIcon({ className }: BackIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.03333 3.6C5.53627 3.6 5.13333 4.00294 5.13333 4.5C5.13333 4.99706 5.53627 5.4 6.03333 5.4V3.6ZM6.03333 5.4H16.1667V3.6H6.03333V5.4ZM20.6 9.83333V10.9H22.4V9.83333H20.6ZM16.1667 15.3333H6.03333V17.1333H16.1667V15.3333ZM20.6 10.9C20.6 13.3485 18.6151 15.3333 16.1667 15.3333V17.1333C19.6092 17.1333 22.4 14.3426 22.4 10.9H20.6ZM16.1667 5.4C18.6151 5.4 20.6 7.38487 20.6 9.83333H22.4C22.4 6.39076 19.6092 3.6 16.1667 3.6V5.4Z"
        fill="currentColor"
      />
      <path
        d="M2.5 16.2333L9.7 12.5383L9.7 19.9284L2.5 16.2333Z"
        fill="currentColor"
      />
    </svg>
  );
}
