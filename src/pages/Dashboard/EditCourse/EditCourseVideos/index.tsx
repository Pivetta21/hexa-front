import { Fragment, useState } from 'react';
import { DefaultSelect } from 'src/styled/Inputs';
import CreateVideo from './CreateVideo';

const EditCourseVideos: React.FC = () => {
  const [option, setOption] = useState('create');

  function handleChange(e: any) {
    setOption(e.target.value);
  }

  return (
    <Fragment>
      <DefaultSelect className="inline" style={{ marginTop: '20px' }}>
        <label htmlFor="option">Você Deseja?</label>
        <select name="option" onChange={(e) => handleChange(e)}>
          <option value="create">Criar Vídeo</option>
          <option value="edit">Editar Vídeo</option>
        </select>
      </DefaultSelect>

      {option == 'create' && <CreateVideo />}
      {option == 'edit' && <div>Edit Vídeo</div>}
    </Fragment>
  );
};

export default EditCourseVideos;
