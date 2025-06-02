'use client';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const welcomeRef = useRef(null);
  const mainRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (welcomeRef.current && mainRef.current) {
        welcomeRef.current.classList.add('hide');
        mainRef.current.classList.add('show');
      }
    }, 3000);

    const openModal = () => modalRef.current.classList.remove('hide');
    const closeModal = () => modalRef.current.classList.add('hide');

    const aboutBtn = document.getElementById('about-button');
    const closeBtn = document.getElementById('close-button');

    aboutBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);

    return () => {
      clearTimeout(timer);
      aboutBtn?.removeEventListener('click', openModal);
      closeBtn?.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <div>
      <style jsx>{`
        body {
          margin: 0;
          font-family: 'Arial', sans-serif;
          background-color: #0a0a0a;
          color: white;
          overflow: hidden;
        }
        .welcome, .main {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #0a0a0a;
          transition: opacity 1s ease;
        }
        .welcome {
          z-index: 2;
        }
        .welcome.hide {
          opacity: 0;
          pointer-events: none;
        }
        .main {
          opacity: 0;
          pointer-events: none;
        }
        .main.show {
          opacity: 1;
          pointer-events: auto;
        }
        h1.glow {
          font-size: 5rem;
          text-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0ff;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { text-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0ff; }
          50% { text-shadow: 0 0 30px #0ff, 0 0 50px #0ff, 0 0 70px #0ff; }
        }
        .buttons {
          margin-top: 20px;
          display: flex;
          gap: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          background-color: #111;
          color: #0ff;
          cursor: pointer;
          box-shadow: 0 0 10px #0ff;
          transition: background 0.3s;
        }
        button:hover {
          background-color: #0ff;
          color: #000;
        }
        .modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3;
        }
        .modal.hide {
          display: none;
        }
        .modal-content {
          background: #111;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 20px #0ff;
          max-width: 500px;
          text-align: center;
        }
        .modal-content h2 {
          margin-top: 0;
          color: #0ff;
        }
        .modal-content p {
          margin: 15px 0;
        }
      `}</style>

      {/* Welcome Screen */}
      <div className="welcome" ref={welcomeRef}>
        <h1 className="glow">Jupot</h1>
      </div>

      {/* Main Screen */}
      <div className="main" ref={mainRef}>
        <h1>Welcome to Jupot</h1>
        <div className="buttons">
          <button id="about-button">About</button>
          <button onClick={() => window.location.href = '/dashboard'}>Dashboard</button>
        </div>
      </div>

      {/* About Modal */}
      <div className="modal hide" ref={modalRef}>
        <div className="modal-content">
          <h2>About Jupot</h2>
          <p>Jupot is a multipurpose Discord bot focused on utility and performance.</p>
          <button id="close-button">Close</button>
        </div>
      </div>
    </div>
  );
}
