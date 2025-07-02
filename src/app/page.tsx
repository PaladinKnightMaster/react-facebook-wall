import { Header } from '@/components/Header'
import { ProfileCard } from '@/components/ProfileCard'
import { Wall } from '@/components/Wall'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg border border-gray-300 p-4">
          <div className="flex gap-4">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <ProfileCard
                name="Greg Wientjes"
                profileImage="/greg-profile.svg"
                location="Palo Alto, CA"
                network="Stanford Alum"
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Wall userName="Greg Wientjes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
