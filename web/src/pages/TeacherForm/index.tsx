import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function setSchaduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItem)

  }

  function handleCreateClass(event: FormEvent) {
    event?.preventDefault();
    console.log({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems
    });

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch((err) => {
      console.log(err);
      alert('Erro ao tentar realizar cadastro!')
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(event) => { setName(event.target.value) }}
            />
            <Input
              name="Avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => { setAvatar(event.target.value) }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(event) => { setWhatsapp(event.target.value) }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => { setBio(event.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(event) => { setSubject(event.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Ed. Física', label: 'Ed. Física' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => { setCost(event.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button onClick={addNewScheduleItem} type="button">
                + Novo horário
            </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={event => setSchaduleItemValue(index, 'week_day', event.target.value)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={event => setSchaduleItemValue(index, 'from', event.target.value)}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={event => setSchaduleItemValue(index, 'to', event.target.value)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;
