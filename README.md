# Wall - Facebook 2009 Style

A nostalgic recreation of Facebook's 2009 wall interface built with modern technologies, featuring Greg Wientjes' profile.

## 🚀 Technologies Used

- **React 19** - Latest React with improved concurrent features
- **Next.js 15** - Full-stack React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Latest utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Comic Neue Font** - Google Fonts for that authentic handwritten feel
- **Custom SVG Graphics** - Stylized profile image

## ✨ Features

- **Authentic Profile**: Greg Wientjes profile with custom SVG portrait
- **Interactive Wall**: Post and view messages in classic Facebook style
- **Real-time Updates**: Add new posts instantly
- **Responsive Design**: Works on desktop and mobile devices
- **2009 Aesthetic**: Authentic Facebook styling with blue theme and comic font
- **Striped Input Area**: Diagonal hatched pattern matching the original mockup
- **Pre-loaded Posts**: Realistic friend messages for demonstration

## 🎨 Design Elements

- **Blue header** with "wall" branding
- **White rounded container** with proper Facebook 2009 layout
- **Square profile image** with professional SVG illustration
- **Gray information sections** (Information, Networks, Current City)
- **Striped input area** with diagonal blue pattern and black dashed border
- **Share button** positioned outside the input area
- **Clean post layout** with author names and messages
- **Comic Neue font** for that casual, friendly feel

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
│   └── page.tsx         # Main page with Greg's profile
├── components/
│   ├── ui/
│   │   └── button.tsx   # Reusable button component
│   ├── Header.tsx       # Blue top navigation
│   ├── ProfileCard.tsx  # Greg's profile sidebar
│   ├── Wall.tsx         # Main wall container
│   ├── WallInput.tsx    # Post creation form with striped background
│   └── WallPost.tsx     # Individual post display
├── lib/
│   └── utils.ts         # Utility functions
public/
├── greg-profile.svg     # Custom SVG portrait of Greg
└── profile.svg          # Original placeholder (can be removed)
```

## 🎯 Components Overview

- **Header**: Facebook-style blue header with "wall" branding
- **ProfileCard**: Shows Greg's photo and info sections (no name in sidebar)
- **Wall**: Main container with Greg's name, "Wall" title, and posts management
- **WallInput**: Form with striped background pattern and external Share button
- **WallPost**: Individual post component with author and message

## 👤 Profile Features

### Greg Wientjes Profile:
- **Custom SVG Portrait**: Professional illustration based on real photo
- **Location**: Palo Alto, CA
- **Network**: Stanford Alum
- **Authentic Details**: Light blue shirt, glasses, professional appearance

### Pre-loaded Wall Posts:
- **Anna**: Coffee maker debugging joke
- **Adelaida**: Stack Overflow reference with emoji
- **Juho**: Coding attire humor
- **Maija**: Computer stickers vs. code joke
- **Alex**: All-nighter coding experience
- **Sheryl**: Dance moves deployment with #AgileDancer

## 🚀 Getting Started

The app comes pre-configured with Greg's profile and sample posts. You can:

1. **View the authentic 2009 layout** with proper spacing and design
2. **Type in the striped input area** to create new posts
3. **Click "Share"** to add your post to the wall
4. **See posts in chronological order** (newest first)

## 📱 Responsive Design

The layout automatically adapts:
- **Desktop**: Horizontal flex layout with sidebar and main content
- **Mobile**: Maintains proportions with responsive containers
- **All devices**: SVG graphics scale perfectly

## 🎨 Customization

You can easily customize:
- **Colors** in `globals.css` (Facebook blue theme variables)
- **Profile information** in `page.tsx`
- **Initial posts** in `Wall.tsx`
- **SVG portrait** in `public/greg-profile.svg`
- **Styling** with Tailwind classes

## 🧪 Built With Modern Standards

- **React 19** concurrent features and improved performance
- **Next.js 15** App Router with optimized loading
- **TypeScript** for complete type safety
- **Tailwind CSS v4** for cutting-edge styling
- **Component-based architecture** for maintainable code
- **Responsive design principles** for all devices
- **SVG graphics** for crisp, scalable images

## 🔧 Technical Highlights

- **Single-file profile management** with TypeScript interfaces
- **State management** for real-time post updates
- **CSS-in-JS** striped patterns for authentic mockup recreation
- **Optimized images** with Next.js Image component
- **Custom SVG creation** for personalized profile pictures
- **Semantic HTML** structure for accessibility

## 📸 Profile Photo

The app features a custom SVG illustration of Greg Wientjes based on his professional photo, including:
- Light blue button-up shirt
- Professional glasses
- Dark hair styling
- Office/outdoor background
- Authentic facial features and proportions

---

**Nostalgia Level**: Maximum 📈  
**Year**: 2024 (but feels like 2009) 🕰️  
**Profile**: Greg Wientjes ✅  
**Authenticity**: Facebook 2009 Certified 🏆

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
