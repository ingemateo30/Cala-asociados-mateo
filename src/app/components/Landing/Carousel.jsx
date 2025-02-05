import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Carousel = () => {
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                ref.current.classList.add("fade-in");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 30,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    return (
        <div ref={ref} className="bg-white py-1">
            <h2 className="text-gray-600 text-5xl font-semibold mb-6 mt-12 text-center">Algunos de nuestros clientes</h2>
            <Slider className="mb-6 mx-4" {...settings}>
                <Card image="./images/logo_salud-mia.png" alt="Logo Salud Mía"/>
                <Card image="./images/NOGAL.png" alt="Logo El Nogal Depósito de Materiales" />
                <Card image="./images/descarga.png" alt="Logo Concretos el Nogal"/>
                <Card image="./images/FIGUHIERROS-LOGO1-325w.webp" alt="Logo FIGUHIERROS FT S.A.S"/>
                <Card image="./images/logo-caficultor.jpeg" alt="Logo Coperativa de caficultores"/>
                <Card image="./images/LOGO JELCOM.jpg" alt="Logo Coperativa de caficultores"/>
            </Slider>
        </div>
    );
};

const Card = ({ image, title }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '400px' }} 
        className="w-full px-4 py-6 mt-6 bg-white rounded-lg shadow-md hover:shadow-lg"
    >
        <div className="flex-shrink-0">
            <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-md" />
        </div>
    </motion.div>
);

export const StatsSection = () => {
    const [years, setYears] = useState(0);
    const [clients, setClients] = useState(0);
    const [teams, setTeams] = useState(0);

    useEffect(() => {
        const intervalYears = setInterval(() => {
            setYears((prev) => (prev < 35 ? prev + 1 : 35));
        }, 200);

        const intervalClients = setInterval(() => {
            setClients((prev) => (prev < 100 ? prev + 50 : 500));
        }, 600);

        const intervalTeams = setInterval(() => {
            setTeams((prev) => (prev < 5 ? prev + 1 : 5));
        }, 200);

        return () => {
            clearInterval(intervalYears);
            clearInterval(intervalClients);
            clearInterval(intervalTeams);
        };
    }, []);

    return (
        <div className="bg-white py-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <p className="text-green-600 text-5xl font-bold">{years}</p>
                    <p className="font-bold">Años de experiencia</p>
                </div>
                <div>
                    <p className="text-green-600 text-5xl font-bold">+{clients}</p>
                    <p className="font-bold">Clientes satisfechos</p>
                </div>
                <div>
                    <p className="text-green-600 text-5xl font-bold">+{teams}</p>
                    <p className="font-bold">Contadores expertos</p>
                </div>
            </div>
        </div>
    );
};