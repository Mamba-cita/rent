import React from 'react';
import Header from './Header';

export default function Layout({
    children
}) {
  return (
    <>

      <main>{children}</main>
      <footer>
        <p>Footer content</p>
        {/* You can include any footer elements here */}
      </footer>
    </>
  );
}
