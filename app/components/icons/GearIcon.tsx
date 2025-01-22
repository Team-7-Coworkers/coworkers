import IconProps from './icon.type';

export default function GearIcon({ classname = '' }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        d="M13.8783 22H10.1283C9.87827 22 9.6616 21.9167 9.47827 21.75C9.29493 21.5833 9.1866 21.375 9.15327 21.125L8.85327 18.8C8.6366 18.7167 8.4326 18.6167 8.24127 18.5C8.04927 18.3833 7.8616 18.2583 7.67827 18.125L5.50327 19.025C5.26993 19.1083 5.0366 19.1167 4.80327 19.05C4.56993 18.9833 4.3866 18.8417 4.25327 18.625L2.40327 15.4C2.26993 15.1833 2.22827 14.95 2.27827 14.7C2.32827 14.45 2.45327 14.25 2.65327 14.1L4.52827 12.675C4.5116 12.5583 4.50327 12.4457 4.50327 12.337V11.662C4.50327 11.554 4.5116 11.4417 4.52827 11.325L2.65327 9.9C2.45327 9.75 2.32827 9.55 2.27827 9.3C2.22827 9.05 2.26993 8.81667 2.40327 8.6L4.25327 5.375C4.36993 5.14167 4.54893 4.99567 4.79027 4.937C5.03227 4.879 5.26993 4.89167 5.50327 4.975L7.67827 5.875C7.8616 5.74167 8.05327 5.61667 8.25327 5.5C8.45327 5.38333 8.65327 5.28333 8.85327 5.2L9.15327 2.875C9.1866 2.625 9.29493 2.41667 9.47827 2.25C9.6616 2.08333 9.87827 2 10.1283 2H13.8783C14.1283 2 14.3449 2.08333 14.5283 2.25C14.7116 2.41667 14.8199 2.625 14.8533 2.875L15.1533 5.2C15.3699 5.28333 15.5743 5.38333 15.7663 5.5C15.9576 5.61667 16.1449 5.74167 16.3283 5.875L18.5033 4.975C18.7366 4.89167 18.9699 4.88333 19.2033 4.95C19.4366 5.01667 19.6199 5.15833 19.7533 5.375L21.6033 8.6C21.7366 8.81667 21.7783 9.05 21.7283 9.3C21.6783 9.55 21.5533 9.75 21.3533 9.9L19.4783 11.325C19.4949 11.4417 19.5033 11.554 19.5033 11.662V12.337C19.5033 12.4457 19.4866 12.5583 19.4533 12.675L21.3283 14.1C21.5283 14.25 21.6533 14.45 21.7033 14.7C21.7533 14.95 21.7116 15.1833 21.5783 15.4L19.7283 18.6C19.5949 18.8167 19.4076 18.9627 19.1663 19.038C18.9243 19.1127 18.6866 19.1083 18.4533 19.025L16.3283 18.125C16.1449 18.2583 15.9533 18.3833 15.7533 18.5C15.5533 18.6167 15.3533 18.7167 15.1533 18.8L14.8533 21.125C14.8199 21.375 14.7116 21.5833 14.5283 21.75C14.3449 21.9167 14.1283 22 13.8783 22ZM12.0533 15.5C13.0199 15.5 13.8449 15.1583 14.5283 14.475C15.2116 13.7917 15.5533 12.9667 15.5533 12C15.5533 11.0333 15.2116 10.2083 14.5283 9.525C13.8449 8.84167 13.0199 8.5 12.0533 8.5C11.0699 8.5 10.2406 8.84167 9.56527 9.525C8.8906 10.2083 8.55327 11.0333 8.55327 12C8.55327 12.9667 8.8906 13.7917 9.56527 14.475C10.2406 15.1583 11.0699 15.5 12.0533 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
