import React, { useEffect, useState } from "react";
import background from "./assets/background.svg";
import cloud from "./assets/cloud.svg";
import heartwhite from "./assets/heart-white.svg";
import letter from "./assets/card.svg";

const Welcome: React.FC = () => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const countdownElement = document.getElementById(
      "countdown"
    ) as HTMLElement;
    const downloadButton = document.getElementById(
      "download-button"
    ) as HTMLButtonElement;
    const endTime = new Date("2024-12-27T00:00:00-05:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        countdownElement.textContent = "Presiona la carta";
        downloadButton.disabled = false;
        setIsTimeUp(true);
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  const handleLetterClick = () => {
    if (isTimeUp) {
      // Ruta al archivo PDF en la carpeta "public"
      const link = document.createElement("a");
      link.href = "/Querida_Damaris.pdf"; // Cambiado a la ruta correcta
      link.download = "Querida_Damaris.pdf";
      link.click();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-pink-100">
      {/* Fondo difuminado */}
      <img
        id="background"
        src={background}
        alt="background"
        className="fixed top-0 left-0 w-full h-full blur-xl -z-10"
      />

      {/* Nubes con corazones */}
      <div className="absolute w-full h-full">
        <div className="relative w-full h-full">
          {[...Array(15)].map((_, i) => (
            <img
              key={`cloud-${i}`}
              src={cloud}
              alt="cloud"
              className="absolute animate-cloud"
              style={{
                width: `${40 + (i % 3) * 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <img
              key={`heart-${i}`}
              src={heartwhite}
              alt="heart"
              className="absolute animate-heart"
              style={{
                width: `${10 + (i % 3) * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Carta flotante */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <button
          id="download-button"
          onClick={handleLetterClick}
          className="animate-float relative w-80 h-64 rounded-md flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <img
              src={letter}
              alt="letter"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </button>
        <p
          id="countdown"
          className="mt-4 text-2xl font-playpen text-[#FF809B] font-semibold"
        ></p>
      </div>

      {/* Modal de alerta */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#FCE7F3] p-6 rounded-lg shadow-lg text-center">
            <p className="text-[#FF809B] font-semibold">¡Paciencia, Damaris!</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 px-4 py-2 bg-[#FF809B] text-white rounded-lg hover:bg-pink-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes cloudMove {
          0% {
            transform: translateX(-10px);
          }
          100% {
            transform: translateX(10px);
          }
        }

        @keyframes heartMove {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-cloud {
          animation: cloudMove 8s ease-in-out infinite alternate;
        }

        .animate-heart {
          animation: heartMove 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
