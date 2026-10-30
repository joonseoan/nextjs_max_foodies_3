import { ReactNode } from 'react';
import './globals.css';
import MainHeader from '@/components/main-header/main-header';

// The page metadata.
// NextJS is looking for exported variables and constants called `metadata`
// in all our page or layout files
// In this metadata variables, we an set all metadata fields.
// This metadata files exposes to SEO crawler and shows up when we are sharing a link to a page.
// X or Facebook

// [IMPORTANT]
// This metadata setup can be in page.tsx and layout.tsx
// Hence, we can set metadata in any page.

// Without specific metadata settings in each page,
// this root metadata in the root layout will cover the metadata in each page.
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export interface HomeProps {
  children: ReactNode;
}

export default function RootLayout({ children }: HomeProps) {
  return (
    <html lang="en">
      <body>

        <MainHeader />
        {children}
      </body>
    </html>
  );
}
