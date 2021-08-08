import { useState } from 'react';
import { DefaultSelect } from 'src/styled/Inputs';
import CreateModule from './CreateModule';
import EditModule from './EditModule';

const EditCourseModules: React.FC = () => {
  const [option, setOption] = useState('create');

  function handleChange(e: any) {
    setOption(e.target.value);
  }

  return (
    <div>
      <DefaultSelect className="inline" style={{ marginTop: '20px' }}>
        <label htmlFor="option">Você Deseja?</label>
        <select name="option" onChange={(e) => handleChange(e)}>
          <option value="create">Criar Módulo</option>
          <option value="edit">Editar Módulo</option>
        </select>
      </DefaultSelect>

      {option == 'create' && <CreateModule />}
      {option == 'edit' && <EditModule />}
    </div>
  );
};

export default EditCourseModules;
