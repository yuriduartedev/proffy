import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/36968573?s=460&u=c3e9d63fd37ea259bc52a1ebd67c74efa76595e8&v=4" alt="Yuri Duarte"/>
        <div>
          <strong>Yuri Duarte</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta at molestiae necessitatibus voluptatum.
        <br /><br />
        illum ipsam odio maxime, dolorem ratione, cum vero eius eveniet corrupti debitis. Eos corporis modi quos vitae.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
