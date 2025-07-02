# Supabase Setup Guide

## 🚀 Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose an organization (or create one)
5. Fill in project details:
   - **Name**: `facebook-wall` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## 🔧 Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **anon/public key** (long JWT token starting with `eyJhbGciOi...`)

## 📝 Step 3: Create Environment File

Create a file named `.env.local` in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_anon_key_here
```

**Replace the values** with your actual credentials from Step 2.

## 🗄️ Step 4: Create Database Table

1. In your Supabase dashboard, go to **Table Editor**
2. Click "Create a new table"
3. Set up the table with these specifications:

**Table Name**: `wall_posts`

**Columns**:
- `id` - Type: `uuid` - Default: `gen_random_uuid()` - Primary Key: ✅
- `author` - Type: `text` - Required: ✅
- `message` - Type: `text` - Required: ✅
- `created_at` - Type: `timestamptz` - Default: `now()` - Required: ✅
- `updated_at` - Type: `timestamptz` - Default: `now()`

4. **Enable Row Level Security (RLS)**:
   - Check "Enable Row Level Security"
   - We'll set up policies in the next step

## 🔐 Step 5: Set Up Security Policies

1. Go to **Authentication** → **Policies**
2. Find the `wall_posts` table
3. Create these policies:

### Policy 1: Allow Public Read
- **Policy Name**: `Allow public read access`
- **Allowed Operation**: `SELECT`
- **Target Roles**: `public`
- **Policy Definition**: `true` (allows everyone to read)

### Policy 2: Allow Public Insert
- **Policy Name**: `Allow public insert access`
- **Allowed Operation**: `INSERT`
- **Target Roles**: `public`
- **Policy Definition**: `true` (allows everyone to post)

## 📱 Step 6: Enable Real-time (Optional)

1. Go to **Database** → **Replication**
2. Find the `wall_posts` table
3. Enable replication for real-time updates

## 🌱 Step 7: Seed Initial Data (Optional)

Run this SQL in the **SQL Editor** to add the initial friend posts:

```sql
INSERT INTO wall_posts (author, message, created_at) VALUES
('Anna', 'Hey Greg, did you debug your coffee maker yet? Last cup tasted like JavaScript errors.', NOW() - INTERVAL '2 hours'),
('Adelaida', 'Greg, saw your last coding session—pretty sure you broke Stack Overflow again! 🔥', NOW() - INTERVAL '3 hours'),
('Juho', 'Greg, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?', NOW() - INTERVAL '5 hours'),
('Maija', 'Greg, rumor has it your computer has more stickers than code running on it. Confirm?', NOW() - INTERVAL '1 day'),
('Alex', 'Yo Greg, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn''t improve coding skills. Weird!', NOW() - INTERVAL '2 days'),
('Sheryl', 'Greg, when are we gonna deploy your latest dance moves to production? #AgileDancer', NOW() - INTERVAL '3 days');
```

## ✅ Step 8: Test Connection

After completing the setup, restart your development server:

```bash
npm run dev
```

The app should now:
- ✅ Connect to Supabase
- ✅ Load posts from the database
- ✅ Save new posts to Supabase
- ✅ Show real-time updates

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Double-check your environment variables
   - Make sure `.env.local` is in the project root
   - Restart the dev server after adding environment variables

2. **"Table doesn't exist" error**:
   - Verify the table name is exactly `wall_posts`
   - Check that all columns are created correctly

3. **"Insufficient privileges" error**:
   - Make sure RLS policies are set up correctly
   - Verify the policies allow public access

4. **Real-time not working**:
   - Enable replication in Database → Replication
   - Check browser console for WebSocket errors

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Next**: Once setup is complete, the app will automatically switch from localStorage to Supabase! 🎉 