# Wall - Facebook 2009 Style

A nostalgic recreation of Facebook's 2009 wall interface built with modern technologies.

## 🚀 Technologies Used

- **React 19** - Latest React with improved concurrent features
- **Next.js 15** - Full-stack React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Comic Neue Font** - Google Fonts for that authentic handwritten feel

## ✨ Features

- **Profile Sidebar**: User profile with photo, information, networks, and location
- **Interactive Wall**: Post and view messages in classic Facebook style
- **Real-time Updates**: Add new posts instantly
- **Responsive Design**: Works on desktop and mobile devices
- **2009 Aesthetic**: Authentic Facebook styling with blue theme and comic font

## 🎨 Design Elements

- Blue header with "wall" branding
- Sidebar with profile information sections
- Dashed border input area for new posts
- Clean post layout with author names and messages
- Gray background with white content cards
- Comic Neue font for that casual, friendly feel

## 🛠️ Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with Facebook colors
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/
│   ├── ui/
│   │   └── button.tsx   # Reusable button component
│   ├── Header.tsx       # Blue top navigation
│   ├── ProfileCard.tsx  # User profile sidebar
│   ├── Wall.tsx         # Main wall container
│   ├── WallInput.tsx    # Post creation form
│   └── WallPost.tsx     # Individual post display
└── lib/
    └── utils.ts         # Utility functions
```

## 🎯 Components Overview

- **Header**: Facebook-style blue header with "wall" branding
- **ProfileCard**: Shows user photo, name, and info sections
- **Wall**: Main container managing posts state
- **WallInput**: Form for creating new posts with "Share" button
- **WallPost**: Individual post component with author and message

## 🚀 Getting Started

The app comes pre-loaded with sample posts from friends. You can:

1. Type in the input area to create new posts
2. Click "Share" to add your post to the wall
3. View all posts in chronological order (newest first)

## 📱 Responsive Design

The layout automatically adapts:
- **Desktop**: Two-column layout with sidebar and main content
- **Mobile**: Single column with stacked components

## 🎨 Customization

You can easily customize:
- Colors in `globals.css` (Facebook blue theme variables)
- Profile information in `page.tsx`
- Initial posts in `Wall.tsx`
- Styling with Tailwind classes

## 🧪 Built With Modern Standards

- React 19 concurrent features
- Next.js 15 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Responsive design principles

---

**Nostalgia Level**: Maximum 📈
**Year**: 2024 (but feels like 2009) 🕰️

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
