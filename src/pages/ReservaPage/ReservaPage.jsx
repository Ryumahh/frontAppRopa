import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function ReservaPage() {
  // Obtener el id de la película desde los parámetros de la URL
  const { id } = useParams();

  // Estado para almacenar los detalles de la película
  const [movieDetails, setMovieDetails] = useState(null);

  // Cargar los detalles de la película cuando el componente se monte
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=9ebbf65c80c0e6ee15f83825a6422dd5&language=es`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    hora: '',
    nombre: '',
    asientos: [],
  });

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar selección de asientos
  const handleSeatSelection = (selectedSeats) => {
    setFormData((prevData) => ({
      ...prevData,
      asientos: selectedSeats,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`¡Reserva completada para la película "${movieDetails.title}" por un precio de 6,75€!`);

    setFormData({
      hora: '',
      nombre: '',
      asientos: [],
    });
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Reserva de película: {movieDetails && movieDetails.title}</h1>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="hora">
            Hora de la reserva:
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="nombre">
            Tu nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="asientos">
            Seleccione los asientos:
          </label>

          <SeatSelection onSelectSeats={handleSeatSelection} />
        </div>
        <button type="submit" className="bg-red-900 hover:bg-red-900/90 text-white font-bold py-2 px-4 rounded ml-2">
          Hacer Reserva
        </button>
      </form>
    </div>
  );
}

// Componente de selección de asientos
function SeatSelection({ onSelectSeats }) {
  // Estado para las filas y números de asientos seleccionados
  const [filaSeleccionada, setFilaSeleccionada] = useState('');
  const [numeroSeleccionado, setNumeroSeleccionado] = useState('');

  // Manejar cambio en la fila seleccionada
  const handleFilaChange = (e) => {
    setFilaSeleccionada(e.target.value);
  };

  // Manejar cambio en el número seleccionado
  const handleNumeroChange = (e) => {
    setNumeroSeleccionado(e.target.value);
  };

  // Manejar selección de asiento
  const handleSeatSelection = () => {
    // Combinar fila y número seleccionados para formar el asiento
    const asientoSeleccionado = `${filaSeleccionada}-${numeroSeleccionado}`;
    onSelectSeats(asientoSeleccionado);
  };

  return (
    <div>
      <label className="block text-white text-sm font-bold mb-2" htmlFor="fila">
        Fila:
      </label>
      <select
        id="fila"
        name="fila"
        value={filaSeleccionada}
        onChange={handleFilaChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Seleccione una fila</option>
        {Array.from({ length: 9 }, (_, index) => (
          <option key={index + 1} value={index + 1}>{index + 1}</option>
        ))}
      </select>

      <label className="block text-white text-sm font-bold mb-2 mt-4" htmlFor="numero">
        Número:
      </label>
      <select
        id="numero"
        name="numero"
        value={numeroSeleccionado}
        onChange={handleNumeroChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Seleccione un número</option>
        {Array.from({ length: 15 }, (_, index) => (
          <option key={index + 1} value={index + 1}>{index + 1}</option>
        ))}
      </select>

      
    </div>
  );
}

export default ReservaPage;
