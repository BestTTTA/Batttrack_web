import '@/styles/globals.css';
import Context from '@/hooks/useContext.js'; // Make sure this import path is correct

export default function App({ Component, pageProps }) {
  return (
    <Context> 
      <main>
        <Component {...pageProps} />
      </main>
    </Context>
  );
}
