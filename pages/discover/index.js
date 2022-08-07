import Link from 'next/link'

const Discover = () => {
  return (
    <div className='grid grid-rows-2'>
      <Link href="/discover/documents">Documents</Link>
      <Link href="/discover/announcements">Announcements</Link>
    </div>
  );
}

export default Discover;