const ShareSvgIcon = ({ name, className = 'h-4 w-4' }) => {
  const commonProps = {
    'aria-hidden': true,
    className,
    fill: 'none',
    focusable: 'false',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.8,
    viewBox: '0 0 24 24'
  }

  switch (name) {
    case 'link':
      return (
        <svg {...commonProps}>
          <path d='M9.5 14.5l5-5' />
          <path d='M7.05 16.95l-1 1a3.54 3.54 0 01-5-5l3.45-3.4a3.54 3.54 0 015 0' />
          <path d='M16.95 7.05l1-1a3.54 3.54 0 015 5l-3.45 3.4a3.54 3.54 0 01-5 0' />
        </svg>
      )
    case 'wechat':
      return (
        <svg {...commonProps}>
          <path d='M14.2 16.55a7.53 7.53 0 01-3.2.7 7.93 7.93 0 01-1.8-.2L6.3 18.5l.75-2.2A6 6 0 015 12c0-3.3 3-6 6.75-6 3.42 0 6.25 2.25 6.7 5.17' />
          <path d='M19.2 17.45a4.55 4.55 0 001.8-3.5c0-2.55-2.3-4.65-5.2-4.65s-5.2 2.1-5.2 4.65 2.3 4.65 5.2 4.65a6.2 6.2 0 001.55-.2l2.2 1.1z' />
          <path d='M8.4 10h.01M14.2 10h.01M13.55 13.85h.01M18 13.85h.01' />
        </svg>
      )
    case 'qq':
      return (
        <svg {...commonProps}>
          <path d='M8.1 10.5c0-4.1 1.45-7 3.9-7s3.9 2.9 3.9 7c0 2.35-.48 4.25-1.35 5.45H9.45C8.58 14.75 8.1 12.85 8.1 10.5z' />
          <path d='M9.15 8.35c-.95 1.15-1.75 2.65-2.35 4.45M14.85 8.35c.95 1.15 1.75 2.65 2.35 4.45M9.45 15.95l-1.7 2.35M14.55 15.95l1.7 2.35M9.3 20.1c.82.35 1.72.52 2.7.52s1.88-.17 2.7-.52' />
          <path d='M9.85 18.35h4.3M10.35 7.75h.01M13.65 7.75h.01M10.65 10.2c.9.55 1.8.55 2.7 0' />
        </svg>
      )
    case 'email':
      return (
        <svg {...commonProps}>
          <rect height='14' rx='2' width='19' x='2.5' y='5' />
          <path d='M4 7l8 6 8-6' />
        </svg>
      )
    default:
      return null
  }
}

export default ShareSvgIcon
