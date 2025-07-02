import Image from 'next/image'

interface ProfileCardProps {
  name: string
  profileImage: string
  location: string
  network: string
}

export function ProfileCard({ name, profileImage, location, network }: ProfileCardProps) {
  return (
    <div className="w-full">
      {/* Profile Image Only */}
      <div className="mb-4 w-full">
        <Image
          src={profileImage}
          alt={name}
          width={240}
          height={240}
          className="rounded-lg w-full h-60 object-cover"
        />
      </div>

      {/* Information Section */}
      <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-3 w-full">
        <h3 className="font-bold text-gray-800 text-sm">Information</h3>
      </div>

      {/* Networks Section */}
      <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-3 w-full">
        <h3 className="font-bold text-gray-800 text-sm mb-1">Networks</h3>
        <p className="text-sm text-gray-700">{network}</p>
      </div>

      {/* Current City Section */}
      <div className="bg-gray-100 border border-gray-300 rounded p-3 w-full">
        <h3 className="font-bold text-gray-800 text-sm mb-1">Current City</h3>
        <p className="text-sm text-gray-700">{location}</p>
      </div>
    </div>
  )
} 