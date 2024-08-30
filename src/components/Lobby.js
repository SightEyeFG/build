import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Lobby = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Lobby</h1>
      <div>
        <Link to="/create">Create Event</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <h2>Available Events</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.eventName} - {event.eventDate}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lobby;
